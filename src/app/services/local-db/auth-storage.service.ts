// auth-storage.service.ts
import { Injectable } from '@angular/core';
import { LocalDB } from './local-db.service';

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
    constructor(private db: LocalDB) { }

    async getAccessToken(): Promise<string | null> {
        const tokens = await this.db.auth.get(1);
        return tokens?.accessToken || null;
    }

    async getRefreshToken(): Promise<string | null> {
        const tokens = await this.db.auth.get(1);
        return tokens?.refreshToken || null;
    }

    async setAccessToken(token: string): Promise<void> {
        const existing = await this.db.auth.get(1);
        await this.db.auth.put({
            id: 1,
            accessToken: token,
            refreshToken: existing?.refreshToken || ''
        });
    }

    async setRefreshToken(token: string): Promise<void> {
        const existing = await this.db.auth.get(1);
        await this.db.auth.put({
            id: 1,
            accessToken: existing?.accessToken || '',
            refreshToken: token
        });
    }

    async clearAll(): Promise<void> {
        await this.db.auth.clear();
    }
}
