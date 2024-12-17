import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreatePostDto } from "./create.post.dto";

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @ApiProperty({
        description: 'Status of the blog post',
        example: 'draft',
        required: false
    })
    @IsOptional()
    @IsString({ message: 'Status must be a string' })
    status?: 'draft' | 'published' | 'archived';
}
