import { IsString, IsUUID } from 'class-validator'

export class Identifier {
    @IsString()
    @IsUUID()
    id: string
}
