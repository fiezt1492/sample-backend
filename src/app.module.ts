import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AuthGuard } from './auth/auth.guard'
import { CatsModule } from './cats/cats.module';

@Module({
    imports: [AuthModule, UsersModule, CatsModule],
    controllers: [AppController],
    providers: [AppService, { provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
