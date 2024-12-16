import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { UserEntity } from 'src/user/entity/user.entity';

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text")
    @IsNotEmpty()
    @IsString()
    title: string;

    @Column('text')
    @IsNotEmpty()
    @IsString()
    content: string;

    @Column({ nullable: true })
    @IsUrl()
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UserEntity, user => user.posts)
    author: UserEntity;
}