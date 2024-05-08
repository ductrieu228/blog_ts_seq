import './sequelize'; // Import Sequelize đã được cấu hình
import express, { Request, Response } from 'express';
import Post from './Modals/Post';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/:id', async ({params:{id}}:Request<{id:string}>, res:Response) => {
    try {
        const posts = await Post.findAll();
        res.send({id,posts})
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
        res.status(500).json({ error: 'Lỗi khi lấy dữ liệu bài viết.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server đã được khởi động tại http://localhost:${PORT}`);
});
