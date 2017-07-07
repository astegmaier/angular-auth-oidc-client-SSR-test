import { CookieStorage } from 'cookie-storage';
import * as MemoryStorage from 'memorystorage';
import { InjectionToken } from "@angular/core";

export const STORAGE = new InjectionToken<IStorage>('IStorage');

export const SERVER_COOKIES = new InjectionToken('ServerCookies');

export function cookieStorageFactory() {
    return new CookieStorage();
}

export function memoryStorageFactory() {
    const myStorage = new MemoryStorage();
    return myStorage
}

export interface IStorage {
    readonly length: number;
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, data: string): void;
    [key: string]: any;
    [index: number]: string;
}