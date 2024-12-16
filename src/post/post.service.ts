// src/modules/posts/posts.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entity/post.entity';
import { UserEntity } from 'src/user/entity/user.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
    ) { }

    async create(createPostDto: CreatePostDto, author: UserEntity): Promise<PostEntity> {
        const post = this.postRepository.create({
            ...createPostDto,
            author
        });
        return await this.postRepository.save(post);
    }

    async findAll(page = 1, limit = 10): Promise<{ posts: PostEntity[], total: number }> {
        const [posts, total] = await this.postRepository.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            relations: ['author'],
            order: { createdAt: 'DESC' }
        });

        return {
            posts,
            total
        };
    }

    async findOne(id: string): Promise<PostEntity> {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['author']
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        return post;
    }

    async update(id: string, updatePostDto: UpdatePostDto, userId: string): Promise<PostEntity> {
        const post = await this.findOne(id);

        // Ensure only the author can update the post
        if (post.author.id !== userId) {
            throw new UnauthorizedException('You are not authorized to update this post');
        }

        return this.postRepository.save({
            ...post,
            ...updatePostDto
        });
    }

    async remove(id: string, userId: string): Promise<void> {
        const post = await this.findOne(id);

        // Ensure only the author can delete the post
        if (post.author.id !== userId) {
            throw new UnauthorizedException('You are not authorized to delete this post');
        }

        await this.postRepository.remove(post);
    }
}