import { NgModule, Inject } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { memoryStorageFactory, STORAGE, COOKIES, IStorage, OidcStorageServer } from "./config/storage-config";
import { OidcSecurityService, AuthModule } from 'angular-auth-oidc-client';
import { configAuth } from "./config/auth-config";

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        AppModuleShared,
        AuthModule.forRoot({storage: OidcStorageServer})
    ],
    providers: [
        { provide: STORAGE, useFactory: memoryStorageFactory, deps: [COOKIES] }
    ]
})
export class AppModule {
    constructor(private _oidcSecurityService: OidcSecurityService, @Inject(STORAGE) private _storage: IStorage) {
        configAuth(_oidcSecurityService, _storage);
    }
}
