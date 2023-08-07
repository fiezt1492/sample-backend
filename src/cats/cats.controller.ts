import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common'
import { Role } from 'src/roles/role.enum'
import { Roles } from 'src/roles/roles.decorator'
import { CatsService } from './cats.service'
import { CreateCatsDto } from './createCats.dto'
import { Public } from 'src/auth/public.decorator'
import { Cat } from 'src/entities/Cat'

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    @Roles(Role.Admin)
    create(@Body() createCatDto: CreateCatsDto) {
        this.catsService.create(createCatDto)
    }

    @Get(':name')
    @Public()
    @HttpCode(HttpStatus.OK)
    findOne(@Param('name') name: string) {
        return this.catsService.findOne(name)
    }

    @Get()
    @Public()
    async findAll(): Promise<any[]> {
        return this.catsService.findAll()
    }
}
