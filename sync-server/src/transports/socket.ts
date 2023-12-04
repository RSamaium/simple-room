import { TransportCommon } from './common';
import { BehaviorSubject } from 'rxjs';
import { Utils } from '../utils';
import { NotAuthorized } from '../errors/not-authorized';

export type BandwidthSocket = { incoming: { size: number, timestamp: number }[], outgoing: { size: number, timestamp: number }[] }
export type BandwidthData = Record<string, BehaviorSubject<BandwidthSocket>>
export type TransportOptions = {
    maxKbpsIncoming?: number
    maxKbpsOutgoing?: number
    clientCanJoinRoom?: boolean
    timeoutDisconnect?: number,
    auth?: (socket: any) => Promise<string | never> | string | never
}

export class Transport extends TransportCommon {
    private bandwidthData: BandwidthData = {};
    private readonly WINDOW_SECONDS = 10; // Store data for the last 10 seconds

    constructor(public io: any, private options: TransportOptions = {}) {
        super();

        io.on('connection', (socket) => {
            const id = socket.playerId
            this.bandwidthData[id] = new BehaviorSubject({
                incoming: [] as any,
                outgoing: [] as any
            });

            this.handleConnection(socket, id);

            socket.on(':input', ({ prop, value }) => this.onInputCb(id, prop, value));
            socket.on(':action', ({ name, value }) => this.onActionCb(id, name, value));
            if (options.clientCanJoinRoom) socket.on(':join', (roomId) => this.onJoinCb(roomId, id));
            socket.on('disconnect', () => {
                this.bandwidthData[id]?.unsubscribe();
                delete this.bandwidthData[id];
                this.onDisconnectedCb(id);
            });
        });

        this.use();
    }

    private handleConnection(socket: any, id: string) {
        this.onConnectedCb(socket, id);
    }

    private use() {
        const { maxKbpsIncoming, maxKbpsOutgoing, auth } = this.options;
        this.io.use?.(async (socket, next) => {
            let playerId

            if (auth) {
                try {
                    playerId = await Utils.resolveValue(auth(socket))
                }
                catch (err) {
                    socket.disconnect();
                    next(new NotAuthorized(err).toObject())
                    return
                }
            }

            if (!playerId) playerId = Utils.generateId(5)

            socket.playerId = playerId;

            // Intercept incoming messages
            socket.use((packet, nextMiddleware) => {
                if (packet && packet[1]) {
                    const packetSize = Utils.bufferFrom(JSON.stringify(packet)).length - 2;
                    const data = { size: packetSize, timestamp: Date.now() };

                    this.updateBandwidthData(playerId, { incoming: data });
                    const kbps = this.calculateKbps(this.bandwidthData[playerId]?.value.incoming || []);
                    if (maxKbpsIncoming && kbps > maxKbpsIncoming) {
                        socket.disconnect();
                        return;
                    }

                    this.cleanOldData(this.bandwidthData[playerId]?.value.incoming || []);
                }
                nextMiddleware();
            });

            // Intercept outgoing messages
            const originalEmit = socket.emit;
            socket.emit = (...args) => {
                const packetSize = Utils.bufferFrom(JSON.stringify(args)).length - 2;
                const data = { size: packetSize, timestamp: Date.now() };

                this.updateBandwidthData(playerId, { outgoing: data });
                const kbps = this.calculateKbps(this.bandwidthData[playerId]?.value.outgoing || []);
                if (maxKbpsOutgoing && kbps > maxKbpsOutgoing) {
                    socket.disconnect();
                    return;
                }

                this.cleanOldData(this.bandwidthData[playerId]?.value.outgoing || []);
                originalEmit.apply(socket, args);
            };

            next();
        });
    }

    private updateBandwidthData(socketId: string, data: { incoming?: { size: number, timestamp: number }, outgoing?: { size: number, timestamp: number } }) {
        const currentData = this.bandwidthData[socketId]?.value || { incoming: [], outgoing: [] };

        if (data.incoming) {
            currentData.incoming.push(data.incoming);
        }
        if (data.outgoing) {
            currentData.outgoing.push(data.outgoing);
        }

        this.bandwidthData[socketId]?.next(currentData);
    }

    private cleanOldData(dataArray: { size: number, timestamp: number }[]) {
        const cutOff = Date.now() - (this.WINDOW_SECONDS * 1000);
        while (dataArray.length > 0 && dataArray[0].timestamp < cutOff) {
            dataArray.shift();
        }
    }

    private calculateKbps(dataArray: { size: number, timestamp: number }[]): number {
        const totalBytes = dataArray.reduce((acc, entry) => acc + entry.size, 0);
        return (totalBytes * 8) / (this.WINDOW_SECONDS * 1000); // Convert bytes to kilobits and divide by seconds
    }

    public getTelemetry(): {
        sockets: Record<string, { incomingKbps: number, outgoingKbps: number }>,
        totalKbps: number
    } {
        const socketsData: Record<string, { incomingKbps: number, outgoingKbps: number }> = {};
        let totalKbps = 0;

        for (const [socketId, bandwidth] of Object.entries(this.bandwidthData)) {
            const socketData = bandwidth.value;
            const incomingKbps = this.calculateKbps(socketData.incoming);
            const outgoingKbps = this.calculateKbps(socketData.outgoing);
            socketsData[socketId] = { incomingKbps, outgoingKbps };
            totalKbps += incomingKbps + outgoingKbps;
        }

        return {
            sockets: socketsData,
            totalKbps
        };
    }
}
