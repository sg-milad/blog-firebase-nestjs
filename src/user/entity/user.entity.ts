import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Column } from 'typeorm';
import { PostEntity } from 'src/post/entity/post.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: "fcb_id" })
    fcbId: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => PostEntity, post => post.author)
    posts: PostEntity[];
}