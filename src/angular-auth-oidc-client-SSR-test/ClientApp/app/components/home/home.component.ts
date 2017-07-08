import { Component, Inject } from '@angular/core';
import { IStorage, STORAGE, COOKIES } from "../../config/storage-config";
import * as MemoryStorage from 'memorystorage';
import { OidcSecurityService } from "angular-auth-oidc-client";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(public oidcSecurityService: OidcSecurityService, @Inject(STORAGE) private _storage: IStorage) {}

    getStorage() {
        return JSON.stringify(this._storage);
    }

    SetACookie() {
        this._storage.setItem("firstcookie","ANOTHER VALUE!");
    }
    
    ngOnInit() {
        if (window.location.hash) {
            this.oidcSecurityService.authorizedCallback();
        }
    }

    login() {
        console.log('start login');
        this.oidcSecurityService.authorize();
    }

    refreshSession() {
        console.log('start refreshSession');
        this.oidcSecurityService.authorize();
    }

    logout() {
        console.log('start logoff');
        this.oidcSecurityService.logoff();
    }

    checkToken() {
        console.log(this.oidcSecurityService.getToken());
    }
}
