import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entity/post.entity';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
    ) { }

    async create(createPostDto: CreatePostDto, authorId: string): Promise<PostEntity> {
        const post = this.postRepository.create({
            author: { fcbId: authorId },
            ...createPostDto
        });
        return await this.postRepository.save(post);
    }

    async findAll(page = 1, limit = 10, userId: string): Promise<{ posts: PostEntity[], total: number }> {
        const [posts, total] = await this.postRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            relations: ['author'],
            order: { createdAt: 'DESC' },
            where: { author: { fcbId: userId } }
        });

        return {
            posts,
            total
        };
    }

    async findOne(id: string, userId: string): Promise<PostEntity> {
        const post = await this.postRepository.findOne({
            where: { id, author: { fcbId: userId } },
            relations: ['author']
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<PostEntity> {
        const post = await this.findOne(id, userId);

        if (post.author.id !== userId && !post) {
            throw new UnauthorizedException('You are not authorized to update this post');
        }

        return this.postRepository.save({
            ...post,
            ...updatePostDto
        });
    }

    async remove(id: string, userId: string) {
        const post = await this.findOne(id, userId);

        if (post.author.id !== userId) {
            throw new UnauthorizedException('You are not authorized to delete this post');
        }

        await this.postRepository.remove(post);
        return { msg: "data deleted successfully" }
    }
}