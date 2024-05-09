import "./sequelize"; // Import Sequelize đã được cấu hình
import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import Post from "./Modals/Post";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
dotenv.config();

const PORT = process.env.PORT || 2208;

app.get(
  "/:id",
  async ({ params: { id } }: Request<{ id: string }>, res: Response) => {
    try {
      const posts = await Post.findAll();
      res.send({ id, posts });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bài viết:", error);
      res.status(500).json({ error: "Lỗi khi lấy dữ liệu bài viết." });
    }
  }
);

// Endpoint để tạo bài viết mới
app.post(
  "/posts",
  async (
    req: Request<
      { id: string },
      unknown,
      {
        title: string;
        content: string;
        author: string;
        author_avatar?: string;
        attached_image?: string;
      }
    >,
    res: Response
  ) => {
    try {
      const { title, content, author, author_avatar, attached_image } =
        req.body;
      if (title != "") {
        const post = await Post.create({
          title,
          content,
          author,
          author_avatar,
          attached_image,
        });
        res.status(201).json(post);
      }
      else{
        res.status(500).json({ error: "Lỗi bài viết khong tieu de." });
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
      res.status(500).json({ error: "Lỗi khi tạo bài viết." });
    }
  }
);

// Endpoint để lấy danh sách bài viết
app.get("/posts", async (req: Request, res: Response) => {
  try {
    const posts = await Post.findAll();
    res.send(posts);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu bài viết:", error);
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu bài viết." });
  }
});

// Endpoint để 1 bài viết
app.get("/posts/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const posts = await Post.findByPk(postId);
    res.send(posts);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu bài viết:", error);
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu bài viết." });
  }
});
// Endpoint để cập nhật bài viết
app.put(
  "/posts/:id",
  async (
    req: Request<
      { id: string },
      unknown,
      {
        title: string;
        content: string;
        author: string;
        author_avatar: string;
        attached_image: string;
        likes: number;
      }
    >,
    res: Response
  ) => {
    const postId = req.params.id;
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: "Bài viết không tồn tại." });
      }
      const { title, content, author, author_avatar, attached_image, likes } =
        req.body;
      console.log(req.body);
      await post.update({
        title,
        content,
        author,
        author_avatar,
        attached_image,
        likes,
      });
      res.send(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Lỗi khi cập nhật bài viết." });
    }
  }
);
// Endpoint để xóa bài viết
app.delete("/posts/:id", async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Bài viết không tồn tại." });
    }
    await post.destroy();
    res.send({ message: "Bài viết đã được xóa thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
    res.status(500).json({ error: "Lỗi khi xóa bài viết." });
  }
});

app.listen(PORT, () => {
  console.log(`Server đã được khởi động tại http://localhost:${PORT}`);
});
