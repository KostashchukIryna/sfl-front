// Файл: src/app/services/course.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Course } from '../local-db/local-db.models';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private readonly API_BASE = '/api/courses';

    constructor(private http: HttpClient) { }

    public async getCoursesFromBackend(): Promise<Course[]> {
        return await lastValueFrom(this.http.get<Course[]>(`${this.API_BASE}`));
    }
    public async getCourseById(id: number): Promise<Course> {
        return await lastValueFrom(this.http.get<Course>(`${this.API_BASE}/${id}`));
    }

    public async createCourse(course: Course): Promise<Course> {
        return await lastValueFrom(this.http.post<Course>(`${this.API_BASE}`, course));
    }

    public async updateCourse(course: Course): Promise<Course> {
        return await lastValueFrom(this.http.put<Course>(`${this.API_BASE}/${course.id}`, course));
    }

    public async deleteCourse(id: number): Promise<void> {
        return await lastValueFrom(this.http.delete<void>(`${this.API_BASE}/${id}`));
    }
}
