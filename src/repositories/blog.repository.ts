import { QueryFilter } from "mongoose";
import { IBlogModel, BlogModel } from "../models/blog.model";

export interface IBlogModelRepository {
    create(blog: IBlogModel): Promise<IBlogModel>;
    findById(id: string): Promise<IBlogModel | null>;
    findAll({ page, size, search }: { page: number, size: number, search?: string }): Promise<{ blogs: IBlogModel[], totalBlogs: number }>;
    update(id: string, blog: Partial<IBlogModel>): Promise<IBlogModel | null>;
    delete(id: string): Promise<boolean>;
}

export class BlogRepository implements IBlogModelRepository {
    async create(blog: IBlogModel): Promise<IBlogModel> {
        const newBlog = new BlogModel(blog);
        const saved = await newBlog.save();
        return saved
    }
    
    async findById(id: string): Promise<IBlogModel | null> {
        const blog = await BlogModel.findById(id).populate("authorId", "firstName lastName email username");
        return blog;
    }
     async findAll({ page, size, search }: { page: number, size: number, search?: string }): Promise<{ blogs: IBlogModel[], totalBlogs: number }> {
        let filter: QueryFilter<IBlogModel> = {}
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ]
        }
        const [blogs, totalBlogs] = await Promise.all([
            BlogModel.find(filter)
                .skip((page - 1) * size)
                .limit(size)
                .populate('authorId', 'username email'),
            BlogModel.countDocuments(filter)
        ]);
        return { blogs, totalBlogs };
    }
    
    async update(id: string, blog: Partial<IBlogModel>): Promise<IBlogModel | null> {
        const update = await BlogModel.findByIdAndUpdate(id, blog, { new: true });
        return update
    }
    
    async delete(id: string): Promise<boolean> {
        const result = await BlogModel.findByIdAndDelete(id);
        return result !== null;
    }
}