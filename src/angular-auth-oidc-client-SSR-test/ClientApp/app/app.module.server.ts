import { NgModule, Inject } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { COOKIES, OidcStorageServer } from "./config/storage-config";
import { OidcSecurityService, AuthModule, OidcSecurityStorage } from 'angular-auth-oidc-client';
import { configAuth } from "./config/auth-config";

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        AppModuleShared,
        AuthModule.forRoot({storage: OidcStorageServer})
    ]
})
export class AppModule {
    constructor(private _oidcSecurityService: OidcSecurityService) {
        configAuth(_oidcSecurityService);
    }
}
