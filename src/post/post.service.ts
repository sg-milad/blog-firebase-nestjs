import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entity/post.entity';
import { CreatePostDto } from './dto/create.post.dto';
import { UserService } from 'src/user/user.service';
import { FileUploadService } from 'src/common/file.upload.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        private userService: UserService,
        private readonly fileUploadService: FileUploadService
    ) { }

    async create(
        createPostDto: CreatePostDto & { imageUrl?: string },
        authorId: string
    ): Promise<PostEntity> {
        const user = await this.userService.findOneUser(authorId);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const post = this.postRepository.create({
            author: user,
            ...createPostDto
        });

        return await this.postRepository.save(post);
    }

    async findAll(page = 1, limit = 10, userId: string): Promise<{ posts: PostEntity[], total: number }> {
        const [posts, total] = await this.postRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: { createdAt: 'DESC' },
            where: { author: { uId: userId } }
        });

        return {
            posts,
            total
        };
    }

    async findOne(id: string, userId: string): Promise<PostEntity> {
        const post = await this.postRepository.findOne({
            where: { id, author: { uId: userId } },
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        return post;
    }

    async update(id: string, updatePostDto: CreatePostDto, userId: string): Promise<PostEntity> {
        const post = await this.findOne(id, userId);

        return this.postRepository.save({
            ...post,
            ...updatePostDto
        });
    }

    async remove(id: string, userId: string) {
        const post = await this.findOne(id, userId);

        if (post.imageUrl) {
            try {
                await this.fileUploadService.deleteFile(post.imageUrl);
            } catch (error) {
                console.warn(`Failed to delete image for post ${id}:`, error);
            }
        }

        await this.postRepository.remove(post);
        return post;
    }
}