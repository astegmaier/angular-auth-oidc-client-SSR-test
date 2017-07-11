import { Component, Inject } from '@angular/core';
import * as MemoryStorage from 'memorystorage';
import { OidcSecurityService} from 'angular-auth-oidc-client';

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
}
