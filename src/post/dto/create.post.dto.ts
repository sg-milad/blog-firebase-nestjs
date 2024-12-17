import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsUrl,
    MaxLength,
    MinLength
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({
        description: 'Title of the blog post',
        example: 'My First Blog Post',
        minLength: 5,
        maxLength: 100
    })
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString({ message: 'Title must be a string' })
    @MinLength(5, { message: 'Title must be at least 5 characters long' })
    @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
    title: string;

    @ApiProperty({
        description: 'Content of the blog post',
        example: 'This is the detailed content of my first blog post...',
        minLength: 10
    })
    @IsNotEmpty({ message: 'Content cannot be empty' })
    @IsString({ message: 'Content must be a string' })
    @MinLength(10, { message: 'Content must be at least 10 characters long' })
    content: string;

    @ApiProperty({
        description: 'URL of the blog post image',
        example: 'https://example.com/image.jpg',
        required: false
    })
    @IsOptional()
    @IsUrl({}, { message: 'Invalid image URL' })
    imageUrl?: string;
}


export class PostResponseDto {
    @ApiProperty({ description: 'Unique identifier of the post' })
    id: string;

    @ApiProperty({ description: 'Title of the blog post' })
    title: string;

    @ApiProperty({ description: 'Content of the blog post' })
    content: string;

    @ApiProperty({ description: 'URL of the blog post image', required: false })
    imageUrl?: string;

    @ApiProperty({ description: 'Date of post creation' })
    createdAt: Date;

    @ApiProperty({ description: 'Date of last post update' })
    updatedAt: Date;

    @ApiProperty({ description: 'ID of the post author' })
    authorId: string;
}