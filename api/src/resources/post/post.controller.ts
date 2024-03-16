import {
    Body,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post
} from '@nestjs/common'
import { CrudController } from '../../common/crud/crud.controller'
import { Omit } from '../../common/decorators/omit/omit.decorator'
import { Identifier } from '../../common/dtos/identifier.dto'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post as PostEntity } from './entities/post.entity'
import { PostService } from './post.service'

/**
 * We have to redeclare the methods that use templated DTOs
 * for them to trigger validation from the framework. There may
 * be a better way but as of yet I haven't found one.
 */
@Omit('remove')
export class PostController extends CrudController<
    PostEntity,
    CreatePostDto,
    UpdatePostDto
>('post', PostService) {
    /**
     * We need to redeclare the crud property to be able to access the
     * full functionality of the service when an extension has been made.
     * We could also type the service in the interface so as to be able
     * to access it via `supe.func()` but that would miss out on the full type.
     */
    protected readonly crud: PostService

    /**
     * Necessary re-declaration as per the class-level comment, no http code
     * retyping as the default is 201 for POST requests and we are creating.
     */
    @Post()
    async create(@Body() createDto: CreatePostDto) {
        return super.create(createDto)
    }

    /**
     * Necessary re-declaration as per the class-level comment, which forces
     * retyping the http code as the default is 200 and we're using 204. The
     * reasoning for the 204 is as follows: 1. we're using NestJS to await the
     * returned promise instead of us explicitly awaiting. 2. we're using
     * NestJS to suppress the body as per the HttpCode. Point 2 is not
     * strictly necessary because the CrudService returns void any way but
     * more layers of protecting data is probably for the best.
     */
    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Param() param: Identifier, @Body() updateDto: UpdatePostDto) {
        return super.update(param, updateDto)
    }

    /**
     * This is an example of an extension of the controller and access to an
     * the extended part of the injected service.
     */
    @Get('extended')
    async extended() {
        return this.crud.extended()
    }
}
