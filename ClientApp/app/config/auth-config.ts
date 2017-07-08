import { OpenIDImplicitFlowConfiguration, OidcSecurityService } from 'angular-auth-oidc-client';
import { IStorage } from "./storage-config";

export function configAuth(_oidcSecurityService: OidcSecurityService, _storage: IStorage) {
    let config = new OpenIDImplicitFlowConfiguration();
    config.stsServer = 'https://login.microsoftonline.com/saleslists.onmicrosoft.com/v2.0'; //saleslists
    config.redirect_url = 'http://localhost:5000'; //saleslists
    config.client_id = '5c48c89e-c70f-46f9-a5cc-297baa4e4e02'; //saleslists
    config.scope = 'openid https://saleslists.onmicrosoft.com/saleslists-api/read-write'; //saleslists
    // config.scope = 'openid profile email';

    // config.stsServer = 'https://login.microsoftonline.com/fabrikamb2c.onmicrosoft.com/v2.0/'; //fabrikam
    // config.redirect_url = 'http://localhost:65328/redirect.html'; //fabrikam
    // config.client_id = 'e760cab2-b9a1-4c0d-86fb-ff7084abd902'; //fabrikam
    // config.scope = 'openid https://fabrikamb2c.onmicrosoft.com/demoapi/demo.read'; //fabrikam
    
    
    
    config.response_type = 'id_token token';
    // config.response_type = 'id_token';
    
    config.post_logout_redirect_uri = 'http://localhost:5000/Unauthorized';
    config.startup_route = '/home';
    config.forbidden_route = 'Forbidden';
    config.unauthorized_route = '/Unauthorized';
    config.log_console_warning_active = true;
    config.log_console_debug_active = true;
    config.max_id_token_iat_offset_allowed_in_seconds = 30000;
    config.override_well_known_configuration_url = "http://localhost:5000/b2cdiscovery/configuration";
    config.override_well_known_configuration = true;
    //_oidcSecurityService.setStorage(_storage);
    _oidcSecurityService.setupModule(config);
}