import { CookieStorage } from 'cookie-storage';
import { InjectionToken, Injectable, Inject } from "@angular/core";
import { OidcSecurityStorage } from 'angular-auth-oidc-client';

export const COOKIES = new InjectionToken('Cookies');

@Injectable()
export class OidcStorageCookies implements OidcSecurityStorage {
    //in production, you should be sure to mark the cookies as "secure" so they are only sent over https
    //like this: private _cookies = new CookieStorage({secure: true})
    private _cookies = new CookieStorage()
    
    public read(key: string): any {
        let value = this._cookies.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
    }
    public write(key: string, value: string): void {
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
        let value = this._dict.get(key);
        if (value) {
            return JSON.parse(value);
        }
    }
    public write(key: string, value: string): void {
        this._dict.set(key, JSON.stringify(value));
    }
}