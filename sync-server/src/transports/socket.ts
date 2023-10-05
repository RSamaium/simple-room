import { TransportCommon } from './common';
import { BehaviorSubject, Observable } from 'rxjs';

export type BandwidthSocket = { incoming: { size: number, timestamp: number }[], outgoing: { size: number, timestamp: number }[] }
export type BandwidthData = Record<string, BehaviorSubject<BandwidthSocket>>
export type TransportOptions = {
    maxKbpsIncoming?: number
    maxKbpsOutgoing?: number
}

export class Transport extends TransportCommon {
    private bandwidthData: BandwidthData = {};
    private readonly WINDOW_SECONDS = 10; // Store data for the last 10 seconds

    constructor(private io: any, private options: TransportOptions = {}) {
        super();

        io.on('connection', (socket) => {
            const id = socket.client.id;
            this.bandwidthData[id] = new BehaviorSubject({
                incoming: [] as any,
                outgoing: [] as any
            });

            this.handleConnection(socket, id);

            socket.on(':input', ({ prop, value }) => this.onInputCb(id, prop, value));
            socket.on(':action', ({ name, value }) => this.onActionCb(id, name, value));
            socket.on(':join', (roomId) => this.onJoinCb(roomId, id));
            socket.on('disconnect', () => {
                this.bandwidthData[id]?.unsubscribe();
                delete this.bandwidthData[id];
                this.onDisconnectedCb(id);
            });
        });

        this.initializeBandwidthMeasurement();
    }

    private handleConnection(socket: any, id: string) {
        this.onConnectedCb(socket, id);
    }

    private initializeBandwidthMeasurement() {
        this.io?.use((socket, next) => {
            const socketId = socket.client.id;

            // Intercept incoming messages
            socket.use((packet, nextMiddleware) => {
                if (packet && packet[1]) {
                    const packetSize = Buffer.from(JSON.stringify(packet)).length - 2;
                    const data = { size: packetSize, timestamp: Date.now() };

                    this.updateBandwidthData(socketId, { incoming: data });
                    const kbps = this.calculateKbps(this.bandwidthData[socketId]?.value.incoming || []);
                    if (this.options.maxKbpsIncoming && kbps > this.options.maxKbpsIncoming) {
                        socket.disconnect();
                        return;
                    }

                    this.cleanOldData(this.bandwidthData[socketId]?.value.incoming || []);
                }
                nextMiddleware();
            });

            // Intercept outgoing messages
            const originalEmit = socket.emit;
            socket.emit = (...args) => {
                const packetSize = Buffer.from(JSON.stringify(args)).length - 2;
                const data = { size: packetSize, timestamp: Date.now() };

                this.updateBandwidthData(socketId, { outgoing: data });
                const kbps = this.calculateKbps(this.bandwidthData[socketId]?.value.outgoing || []);
                if (this.options.maxKbpsOutgoing && kbps > this.options.maxKbpsOutgoing) {
                    socket.disconnect();
                    return;
                }

                this.cleanOldData(this.bandwidthData[socketId]?.value.outgoing || []);
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
