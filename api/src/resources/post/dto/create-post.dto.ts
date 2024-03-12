import { IsString, Length } from 'class-validator'

export class CreatePostDto {
    @IsString()
    @Length(1, 1024)
    content: string
}
