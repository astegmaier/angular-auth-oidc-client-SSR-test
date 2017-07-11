import { Component, Inject } from '@angular/core';
import * as MemoryStorage from 'memorystorage';
<<<<<<< HEAD
import { OidcSecurityService } from "angular-auth-oidc-client";
=======
import { OidcSecurityService} from 'angular-auth-oidc-client';
>>>>>>> 35f3e9ea8f79223611aecbf8b74266f5294b1f0a

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public authToken: string;
    public userInfo: string;
    
    constructor(private oidcSecurityService: OidcSecurityService) { }

    ngOnInit() {
        if (typeof location !== "undefined" && window.location.hash) {
            this.oidcSecurityService.authorizedCallback();
        }
        setTimeout(() => {
            this.checkToken();
            this.checkUserInfo();
        }, 0);
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
        this.authToken = JSON.stringify(this.oidcSecurityService.getToken());
    }
    
    checkUserInfo() {
        this.userInfo = JSON.stringify(this.oidcSecurityService.getUserData());
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
        console.log('auth token from getToken():');
        console.log(this.oidcSecurityService.getToken());
    }
    checkUserData() {
        console.log('User info from getUserData():');
        console.log(this.oidcSecurityService.getUserData());
    }
}
