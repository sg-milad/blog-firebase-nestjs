import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./entity/post.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity])]
})
export class PostModule { }