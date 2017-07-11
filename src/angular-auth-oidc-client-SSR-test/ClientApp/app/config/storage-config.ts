import { CookieStorage } from 'cookie-storage';
import * as MemoryStorage from 'memorystorage';
import { InjectionToken, Injectable, Inject } from "@angular/core";
import { OidcSecurityStorage } from 'angular-auth-oidc-client';

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

@Injectable()
export class OidcStorageCookies implements OidcSecurityStorage {
    private _cookies = new CookieStorage()
    
    public read(key: string): any {
        console.log("about to GET a key!");
        console.log(key);
        return JSON.parse(this._cookies.getItem(key));
    }
    public write(key: string, value: string): void {
        console.log("about to set key and value!");
        console.log(key);
        console.log(value);
        this._cookies.setItem(key, JSON.stringify(value));
    }
}

@Injectable()
export class OidcStorageServer implements OidcSecurityStorage {
    private _dict = new Map<string, any>();

    constructor(@Inject(COOKIES) private _cookies: Array<any>) {
        _cookies.forEach(element => {
            if (element instanceof Object && "key" in element && "value" in element) {
                this._dict.set(element.key, element.value);
            }
        });
    }
    
    public read(key: string): any {
        return JSON.parse(this._dict.get(key));
    }
    public write(key: string, value: string): void {
        this._dict.set(key, JSON.stringify(value));
    }
}