import { CookieStorage } from 'cookie-storage';
import * as MemoryStorage from 'memorystorage';
import { InjectionToken } from "@angular/core";

export const STORAGE = new InjectionToken<IStorage>('IStorage');

export function cookieStorageFactory() {
    return new CookieStorage();
}

export function memoryStorageFactory() {
    return new MemoryStorage();
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