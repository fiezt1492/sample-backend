import { Injectable } from '@nestjs/common'
import { User } from 'src/entities/User'
import { Role } from 'src/roles/role.enum'

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
            roles: [Role.Admin],
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
            roles: [Role.User],
        },
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username)
    }
}
