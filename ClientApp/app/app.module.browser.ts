import { NgModule, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { cookieStorageFactory, STORAGE, COOKIES, IStorage } from "./config/storage-config";
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { configAuth } from "./config/auth-config";


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared
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
