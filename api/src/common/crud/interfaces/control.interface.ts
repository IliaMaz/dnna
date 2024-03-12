import { Identifier } from '../../dtos/identifier.dto'

export interface Control<Model, CreateDto, UpdateDto> {
    create(createDto: CreateDto): Promise<Model>

    findOne(param: Identifier): Promise<Model>
    update(param: Identifier, updateDto: UpdateDto): Promise<void>
    remove(param: Identifier): Promise<void>
}
