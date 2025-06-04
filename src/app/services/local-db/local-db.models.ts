export interface Course {
    id: number;
    title: string;
    description: string;
    imagePath: string;
    preview: string;
    published: boolean;
    rating: number;
    targetUser: string;
    authorId: number;
    categoryId: number;
    createdAt: string;
}

export interface CourseModule {
    id: number;
    courseId: number;
    title: string;
    order: number;
}

export interface Category {
    id: number;
    title: string;
    emoji: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
}