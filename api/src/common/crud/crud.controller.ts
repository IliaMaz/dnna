import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    Patch,
    Post,
    Type
} from '@nestjs/common'
import { DeepPartial, ObjectLiteral } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { Identifier } from '../dtos/identifier.dto'
import { Control } from './interfaces/control.interface'
import { Service } from './interfaces/service.interface'

/**
 *
 * <Model> is the entity class used by TypeORM
 * <CreateDto> is the DTO used for creating entities of <Model>
 * <UpdateDto> is the DTO used for updating entities of <Model>
 *
 * @param path url path to use, given 'post' the url would be /api/post
 * @param crud service class of the controller derived from CrudService
 * @returns a controller base class to be extended by the actual controller
 *
 * Usage notes: please be aware that the entity must conform to the identifier
 * class, without this, things will not work as expected. Need to find a way
 * to enforce overlap between the Identifier type and the Model type.
 *
 * Other notes and improvements: there is very clearly no index method, this
 * is because there should be a pagination method instead. Pagination is not
 * a part of TypeORM as it is in Eloquent (Laravel) where you can simply call
 * paginate. Implementing full scale pagination is a beast and a half, it is
 * a substantial and complex system in and of itself. There are very many
 * pitfalls / gotchas involved and as such won't be implemented in this repo.
 */
export function CrudController<
    Model extends ObjectLiteral,
    CreateDto extends DeepPartial<Model>,
    UpdateDto extends QueryDeepPartialEntity<Model>
>(
    path: string,
    crud: Type<Service<Model, CreateDto, UpdateDto>>
): Type<Control<Model, CreateDto, UpdateDto>> {
    @Controller(path)
    class CrudControllerHost {
        @Inject(crud) protected readonly crud: Service<
            Model,
            CreateDto,
            UpdateDto
        >

        @Post()
        @HttpCode(HttpStatus.CREATED)
        async create(@Body() createDto: CreateDto) {
            return this.crud.create(createDto)
        }

        @Get(':id')
        @HttpCode(HttpStatus.OK)
        async findOne(@Param() param: Identifier) {
            return this.crud.findOne(param)
        }

        @Patch(':id')
        @HttpCode(HttpStatus.NO_CONTENT)
        async update(@Param() param: Identifier, @Body() updateDto: UpdateDto) {
            return this.crud.update(param, updateDto)
        }

        @Delete(':id')
        @HttpCode(HttpStatus.NO_CONTENT)
        async remove(@Param() param: Identifier) {
            return this.crud.remove(param)
        }
    }

    return CrudControllerHost
}
