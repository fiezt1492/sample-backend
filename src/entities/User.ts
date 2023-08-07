import { Role } from "src/roles/role.enum"

export class User {
    userId: number
    username: string
    password: string
    roles: Role[] = []
}
