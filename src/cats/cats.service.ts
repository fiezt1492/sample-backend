import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCatsDto } from './createCats.dto'
import { Cat } from 'src/entities/Cat'

@Injectable()
export class CatsService {
    private _cats: Cat[] = [
        { name: 'black', age: 1, breed: "Tom n Jerry's Black Cat" },
        { name: 'blue', age: 2, breed: "Tom n Jerry's Blue Cat" },
    ]

    async create(createCatsDto: CreateCatsDto) {
        this._cats.push(createCatsDto)
    }

    findOne(name: string): Cat {
        const foundedCat = this._cats.find((cat) =>
            cat.name.toLowerCase().includes(name.toLowerCase())
        )

        if (!foundedCat) throw new NotFoundException()

        return foundedCat
    }
    findAll() {
        return this._cats
    }
}
