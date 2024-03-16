import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { CrudService } from '../../common/crud/crud.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { Post } from './entities/post.entity'

@Injectable()
export class PostService extends CrudService<
    Post,
    CreatePostDto,
    UpdatePostDto
>(Post) {
    /**
     * Same as with the controller, we want to redeclare the repo property,
     * in the case that we want to extend the service and interact with the
     * underlying repo. In part it's also done this way to maintain explicit
     * and proper privacy typing.
     */
    protected readonly repo: Repository<Post>

    /**
     * This is an example of an extension of the service and caller access.
     */
    async extended() {
        return { extended: await this.repo.find() }
    }
}
