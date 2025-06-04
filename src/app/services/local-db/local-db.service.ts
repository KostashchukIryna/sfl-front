import Dexie, { Table } from 'dexie';
import { Injectable } from '@angular/core';
import { Course, CourseModule, Category, User } from './local-db.models';

@Injectable({
    providedIn: 'root'
})
export class LocalDB extends Dexie {
    public courses!: Table<Course, number>;
    public modules!: Table<CourseModule, number>;
    public categories!: Table<Category, number>;
    public users!: Table<User, number>;

    constructor() {
        super('PWA_EmergencyDB');
        this.version(1).stores({
            courses: '++id, title, categoryId',
            modules: '++id, courseId',
            categories: '++id, title',
            users: '++id, username'
        });
    }

}
export type { Course };

