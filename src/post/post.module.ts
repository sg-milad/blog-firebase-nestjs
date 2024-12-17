import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostEntity } from "./entity/post.entity";
import { PostsController } from "./post.controller";
import { PostsService } from "./post.service";
import { FirebaseAdmin } from "src/configs/firebase.setup";
import { UserModule } from "src/user/user.module";
import { MulterModule } from "@nestjs/platform-express";
import { FileUploadService } from "src/common/file.upload.service";

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity]),
    MulterModule.register({
        limits: {
            fileSize: 5 * 1024 * 1024, // 5MB
        },
    })
        , UserModule],
    controllers: [PostsController],
    providers: [PostsService, FirebaseAdmin, FileUploadService]
})
export class PostModule { }