import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import * as fs from 'fs-extra';
import * as path from 'path';

@Injectable()
export class FileUploadService {
    private readonly uploadDir = path.join(process.cwd(), 'uploads');

    constructor() {
        fs.mkdirSync(this.uploadDir, { recursive: true });
    }

    async uploadFile(file: Express.Multer.File, userId: string): Promise<string> {
        const userUploadDir = path.join(this.uploadDir, userId);
        fs.mkdirSync(userUploadDir, { recursive: true });

        const filename = this.generateUniqueFileName(file);
        const filePath = path.join(userUploadDir, filename);

        await fs.writeFile(filePath, file.buffer);

        return `/uploads/${userId}/${filename}`;
    }

    private generateUniqueFileName(file: Express.Multer.File): string {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return `${uniqueSuffix}${extname(file.originalname)}`;
    }

    async deleteFile(filePath: string): Promise<void> {
        const fullPath = path.join(process.cwd(), filePath.replace(/^\//, ''));

        try {
            await fs.unlink(fullPath);
        } catch (error) {
            console.warn(`Failed to delete file ${fullPath}:`, error);
        }
    }
}