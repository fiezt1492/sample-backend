import { Logger } from '@nestjs/common'
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets'
import { Observable, from, map } from 'rxjs'
import { Server, Socket } from 'socket.io'

type MessagePayload = {
    username: string
    content: string
}

@WebSocketGateway(3006, {
    cors: {
        origin: '*',
    },
})
export class EventsGateway {
    @WebSocketServer()
    server: Server

    private readonly logger = new Logger(EventsGateway.name)

    private users: string[] = []

    @SubscribeMessage('messages')
    async handleMessage(client: Socket, payload: any) {
        const parsedPayload =
            typeof payload === 'string'
                ? (JSON.parse(payload) satisfies MessagePayload)
                : payload
        this.logger.log(
            parsedPayload.username + ' sent ' + parsedPayload.content
        )
        if (!this.users.includes(parsedPayload.username))
            this.users.push(parsedPayload.username)
        this.server.emit('message', parsedPayload)
    }

    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
        return from([1, 2, 3]).pipe(
            map((item) => ({ event: 'events', data: item }))
        )
    }

    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
        return data
    }

    handleConnection(client: Socket) {
        this.logger.log('connection to socket... token = ', client.id)
    }
}
