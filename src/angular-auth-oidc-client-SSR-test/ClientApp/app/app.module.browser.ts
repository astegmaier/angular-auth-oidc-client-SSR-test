import { NgModule, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { cookieStorageFactory, STORAGE, COOKIES, IStorage, OidcStorageCookies } from "./config/storage-config";
import { OidcSecurityService, AuthModule } from 'angular-auth-oidc-client';
import { configAuth } from "./config/auth-config";
import { CookieStorage } from "cookie-storage";


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared,
        AuthModule.forRoot({storage: OidcStorageCookies})
        // AuthModule.forRoot()
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        { provide: STORAGE, useFactory: cookieStorageFactory },
        { provide: COOKIES, useValue: [document.cookie] }
    ]
})
export class AppModule {
    constructor(private _oidcSecurityService: OidcSecurityService, @Inject(STORAGE) private _storage: IStorage) {
        configAuth(_oidcSecurityService, _storage);
    }
}
