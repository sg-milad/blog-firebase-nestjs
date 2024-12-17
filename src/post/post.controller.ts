import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { PostsService } from './post.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreatePostDto, PaginatedResponseDto, PostResponseDto } from './dto/create.post.dto';
import { User } from 'src/common/decorators/current.user.decorator';
import { ApiConsumes, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/common/file.upload.service';

@Controller('posts')
@Auth('USER')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly fileUploadService: FileUploadService
    ) { }

    @Post()
    @ApiOkResponse({ type: PostResponseDto })
    @ApiConsumes('multipart/form-data')
    @ApiOkResponse({ type: PostResponseDto })
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() createPostDto: CreatePostDto,
        @UploadedFile() image: Express.Multer.File,
        @User("uid") userId: string
    ) {
        let imageUrl
        if (image) {
            imageUrl = await this.fileUploadService.uploadFile(image, userId);
        }
        return this.postsService.create({
            ...createPostDto,
            imageUrl
        }, userId);

    }

    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1, description: 'Page number for pagination' })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10, description: 'Number of items per page' })
    @ApiOkResponse({ type: PaginatedResponseDto<PostResponseDto> })
    async findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10,
        @User("uid") userId: string
    ) {
        return this.postsService.findAll(page, limit, userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @User("uid") userId: string
    ) {
        return await this.postsService.findOne(id, userId)
    }

    @Put(':id')
    @ApiOkResponse({ type: PostResponseDto })
    async update(
        @Param('id') id: string,
        @Body() updatePostDto: CreatePostDto,
        @User("uid") userId: string

    ) {
        return await this.postsService.update(id, updatePostDto, userId);
    }

    @Delete(':id')
    @ApiOkResponse({ type: PostResponseDto })
    async remove(
        @Param('id') id: string,
        @User("uid") userId: string
    ) {
        return await this.postsService.remove(id, userId);
    }
}