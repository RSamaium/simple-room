class MiddlewareHandler {
    middlewares: any[] = [];
  
    use(middleware) {
      this.middlewares.push(middleware);
    }
  
    run(socket, finalCallback = (err?) => {}) {
      let index = 0;
  
      const next = (err?) => {
 
        if (err) {
          finalCallback(err);
          return;
        }
  
        if (index >= this.middlewares.length) {
          finalCallback();
          return;
        }
  
        const middleware = this.middlewares[index];
        index += 1;
  
        middleware(socket, next);
      };
  
      next();
    }

    clear() {
        this.middlewares = []
    }
  }


class MockIo {
    events: Map<string, any[]> = new Map()
    eventsOnce: Map<string, any> = new Map()

    on(name: string, value) {
        this.events.set(name, [...(this.events.get(name) || []), value])
    }

    off(name: string) {
        if (this.eventsOnce.has(name)) {
            this.eventsOnce.delete(name)
            return
        }
        this.events.delete(name)
    }

    once(name: string, value) {
        this.eventsOnce.set(name, value)
    }

    _trigger(name: string, data, client?) {
        const events = this.events.get(name) || []
        for (const event of events) {
            event(data, client)
        }
        const eventOnce = this.eventsOnce.get(name)
        if (eventOnce) {
            eventOnce(data, client)
            this.eventsOnce.delete(name)
        }
    }
}

class MockSocket {
    id: string
    client: any = {}
    middlewares = new MiddlewareHandler()

    constructor(private io: any, public handshake, private fakeId?: string) {
        this.id = fakeId ?? ''+Math.random()
        this.client.id = this.id
    }
    
    on(name: string, value) {
        this.io.on(name, value, this.id)
        return this
    }

    once(name: string, value) {
        this.io.once(name, value, this.id)
        return this
    }

    emit(name: string, data) {
        this.io.emit(name, data, this.id)
    }

    removeAllListeners(name: string) {
        return this.off(name)
    }

    use(cb: (packet, next) => void) {
        this.middlewares.use(cb)
    }

    off(name: string) {
        this.io.off(name, this.id)
    }

    disconnect() { }
}

class MockClientIo extends MockIo {
    id: string = ''
    _socket: any = null

    constructor(public fakeId?: string) {
        super()
    }

    connection(handshake?: any) {
        this._socket = serverIo.connection(this, handshake)
        this._trigger('connect', undefined)
        return this
    }

    emit(name: string, data) {
        if (!this._socket) throw new Error('Client not connected')
        this._socket.middlewares.run([name, data], (err) => {
            if (err) {
                this._trigger('error', err)
                return
            }
            serverIo._trigger(name, data, this)
        })
        return this
    }

    disconnect() {
        this.emit('disconnect', undefined)
    }
}

class MockServerIo extends MockIo {
    private clients: Map<string, MockClientIo> = new Map()
    private middlewares = new MiddlewareHandler()

    connection(client, handshake) {
        const socket = new MockSocket(this, handshake, client.fakeId)
        this.clients.set(socket.id, client)
        client.id = socket.id
        this.middlewares.run(socket, (err) => {
            if (err) {
                client._trigger('error', err)
                return
            }
            this._trigger('connection', socket)
        })
        return socket
    }

    emit(name: string, data, id) {
        this.clients.get(id)?._trigger(name, data)
    }

    use(cb: (socket, next) => void) {
        this.middlewares.use(cb)
    }

    clear() {
        this.clients.clear()
        this.middlewares.clear()
    }
}

const serverIo = new MockServerIo()
const ClientIo = MockClientIo

export default {
    serverIo,
    ClientIo
}