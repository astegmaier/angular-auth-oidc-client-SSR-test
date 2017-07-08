import { OpenIDImplicitFlowConfiguration, OidcSecurityService } from 'angular-auth-oidc-client';
import { IStorage } from "./storage-config";

export function configAuth(_oidcSecurityService: OidcSecurityService, _storage: IStorage) {
    let config = new OpenIDImplicitFlowConfiguration();
    config.stsServer = 'https://login.microsoftonline.com/saleslists.onmicrosoft.com/v2.0';
    config.redirect_url = 'http://localhost:5000';
    config.client_id = '9d013e00-91df-487f-b260-c33e77dfb844';
    config.response_type = 'id_token';
    config.scope = 'openid profile email';
    config.post_logout_redirect_uri = 'http://localhost:5000/Unauthorized';
    config.startup_route = '/home';
    config.forbidden_route = 'Forbidden';
    config.unauthorized_route = '/Unauthorized';
    config.log_console_warning_active = true;
    config.log_console_debug_active = true;
    config.max_id_token_iat_offset_allowed_in_seconds = 10;
    _oidcSecurityService.setStorage(_storage);
    _oidcSecurityService.setupModule(config);
}