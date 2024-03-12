import { Injectable, NotFoundException, Type } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type'
import {
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    ObjectLiteral,
    Repository
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { Identifier } from '../dtos/identifier.dto'
import { Service } from './interfaces/service.interface'

/**
 * <Model> is the entity class used by TypeORM
 * <CreateDto> is the DTO used for creating entities of <Model>
 * <UpdateDto> is the DTO used for updating entities of <Model>
 *
 * @param model entity class used to injected the relevant TypeORM repository
 * @returns a service base class to be extended by the actual service
 *
 * Usage notes: please be aware that the entity must conform to the identifier
 * class, without this, things will not work as expected. Need to find a way
 * to enforce overlap between the Identifier type and the Model type.
 */
export function CrudService<
    Model extends ObjectLiteral,
    CreateDto extends DeepPartial<Model>,
    UpdateDto extends QueryDeepPartialEntity<Model>
>(model: EntityClassOrSchema): Type<Service<Model, CreateDto, UpdateDto>> {
    @Injectable()
    class CrudServiceHost {
        constructor(
            @InjectRepository(model) protected readonly repo: Repository<Model>
        ) {}

        private async provideOrThrowIfNotDefined(entity: Model | null) {
            if (!entity) {
                throw new NotFoundException()
            }

            return entity
        }

        /**
         * Throws errors exclusively related to TypeORM. These can stem
         * from improperly sanitized input, unhandled conflicts, etc.
         */
        async create(createDto: CreateDto) {
            return this.repo.save(createDto)
        }

        /**
         * @throws {NotFoundException} if the entity is not found
         */
        async findOne(param: Identifier) {
            return this.provideOrThrowIfNotDefined(
                await this.repo.findOneBy(
                    param as unknown as FindOptionsWhere<Model>
                )
            )
        }

        /**
         * Throws errors exclusively related to TypeORM. These can stem
         * from improperly sanitized input, unhandled conflicts, etc.
         */
        async update(param: Identifier, updateDto: UpdateDto) {
            await this.repo.update(param.id, updateDto)
        }

        /**
         * @throws {NotFoundException} if the entity is not found
         */
        async remove(param: Identifier) {
            await this.repo.remove(await this.findOne(param))
        }

        /**
         * This method is technically not a necessary part of CRUD, it is a utility
         * to be used for extension of the service and as such could be removed if
         * mainly unused. It is just a wrapper and very easy to implement in extended
         * classes.
         */
        async findWith(options: FindManyOptions<Model>) {
            return this.repo.find(options)
        }

        /**
         * This method is technically not a necessary part of CRUD, it is a utility
         * to be used for extension of the service and as such could be removed if
         * mainly unused. It is just a wrapper and very easy to implement in extended
         * classes.
         *
         * @throws {NotFoundException} if the entity is not found
         */
        async findOneWith(options: FindOneOptions<Model>) {
            return this.provideOrThrowIfNotDefined(
                await this.repo.findOne(options)
            )
        }
    }

    return CrudServiceHost
}
