import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query
} from '@nestjs/common';
import { PostsService } from './post.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { User } from 'src/common/decorators/current.user.decorator';

@Controller('posts')
@Auth('USER')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    create(
        @Body() createPostDto: CreatePostDto,
        @User("uid") userId: string
    ) {
        return this.postsService.create(createPostDto, userId);
    }

    @Get()
    findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @User("uid") userId: string
    ) {
        return this.postsService.findAll(page, limit, userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @User("uid") userId: string) {
        return this.postsService.findOne(id, userId)
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
        @User("uid") userId: string
    ) {
        return this.postsService.update(id, updatePostDto, userId);
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @User("uid") userId: string
    ) {
        return this.postsService.remove(id, userId);
    }
}