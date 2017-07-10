import { Component, Inject } from '@angular/core';
import { IStorage, STORAGE, COOKIES } from "../../config/storage-config";
import * as MemoryStorage from 'memorystorage';
import { OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(@Inject(STORAGE) private _storage: IStorage, private oidcSecurityService: OidcSecurityService) {}

    getStorage() {
        return JSON.stringify(this._storage);
    }

    SetACookie() {
        this._storage.setItem("firstcookie","ANOTHER VALUE!");
    }

    login() {
        console.log('start login');
        this.oidcSecurityService.authorize();
    }

    logout() {
        console.log('start logoff');
        this.oidcSecurityService.logoff();
    }

    checkToken() {
        console.log(this.oidcSecurityService.getToken());
    }
    
    checkUserInfo() {
        console.log(this.oidcSecurityService.getUserData());
    }
}
