// src/modules/posts/posts.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    UseGuards,
    Req,
    Query
} from '@nestjs/common';
import { Request } from 'express';
import { PostsService } from './post.service';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('posts')
@Auth('USER')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    create(
        @Body() createPostDto: CreatePostDto,
        @Req() req: Request
    ) {
        const user = req.user as any;
        return this.postsService.create(createPostDto, user);
    }

    @Get()
    findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.postsService.findAll(page, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
        @Req() req: Request
    ) {
        const user = req.user as any;
        return this.postsService.update(id, updatePostDto, user.uid);
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @Req() req: Request
    ) {
        const user = req.user as any;
        return this.postsService.remove(id, user.uid);
    }
}