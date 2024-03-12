import { FindManyOptions, FindOneOptions } from 'typeorm'
import { Control } from './control.interface'

export interface Service<Model, CreateDto, UpdateDto>
    extends Control<Model, CreateDto, UpdateDto> {
    findWith(options: FindManyOptions<Model>): Promise<Model[]>
    findOneWith(options: FindOneOptions<Model>): Promise<Model>
}
