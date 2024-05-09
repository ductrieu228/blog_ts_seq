import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize'; // Import Sequelize đã được cấu hình

class Post extends Model {
    public id!: number;
    public title!: string;
    public content!: string;
    public author!: string;
    public author_avatar!: string;
    public attached_image!: string | null;
    public likes!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author_avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        attached_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        likes: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
    }
);

export default Post;
