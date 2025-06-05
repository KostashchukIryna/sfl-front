
import { Injectable } from '@angular/core';
import { LocalDB, Course } from '../local-db/local-db.service';
import { CourseService } from './course.service';

@Injectable({
    providedIn: 'root'
})
export class CourseDataService {
    constructor(
        private api: CourseService,
        private localDB: LocalDB
    ) { }

    public async getCourses(): Promise<Course[]> {
        if (navigator.onLine) {
            try {
                const coursesFromServer: Course[] = await this.api.getCoursesFromBackend();
                await this.localDB.courses.clear();
                await this.localDB.courses.bulkPut(coursesFromServer);

                return coursesFromServer;
            } catch (error) {
                console.warn('API ERROR', error);
                return await this.localDB.courses.toArray();
            }
        } else {
            return await this.localDB.courses.toArray();
        }
    }

    public async getCourseById(courseId: number): Promise<Course | undefined> {
        if (navigator.onLine) {
            try {
                const course: Course = await this.api.getCourseById(courseId);
                await this.localDB.courses.put(course);
                return course;
            } catch (error) {
                console.warn('NOT POSSIBLE TO RECEIVE DATA', error);
                return await this.localDB.courses.get(courseId);
            }
        } else {
            return await this.localDB.courses.get(courseId);
        }
    }
}
