import { CookieStorage } from 'cookie-storage';
import * as MemoryStorage from 'memorystorage';
import { InjectionToken } from "@angular/core";

export const STORAGE = new InjectionToken<IStorage>('IStorage');

export const COOKIES = new InjectionToken('Cookies');

export function cookieStorageFactory() {
    return new CookieStorage();
}

export function memoryStorageFactory(COOKIES) {
    let serverStorage = new MemoryStorage();

    if (COOKIES.constructor === Array) {
        COOKIES.forEach(element => {
            if (element instanceof Object && "key" in element && "value" in element) {
                serverStorage.setItem(element.key, element.value);
            }
        });
    }

    return serverStorage;
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