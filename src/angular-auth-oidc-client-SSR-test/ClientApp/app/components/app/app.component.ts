import { Component, Inject } from '@angular/core';
import { OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private oidcSecurityService: OidcSecurityService) {}

    ngOnInit() {
        if (typeof location !== "undefined" && window.location.hash) {
            this.oidcSecurityService.authorizedCallback();
        }
    }
}
