import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AuthGuard } from './auth/auth.guard'
import { CatsModule } from './cats/cats.module'
import { EventsModule } from './events/events.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
            exclude: ['/api/(.*)'],
        }),
        AuthModule,
        UsersModule,
        CatsModule,
        EventsModule,
    ],
    controllers: [AppController],
    providers: [AppService, { provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
