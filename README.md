# Purpose 
This repo is a test to see whether [angular-auth-oidc-client](https://github.com/damienbod/angular-auth-oidc-client) can work with server-side rendering (SSR). There is [active discussion](https://github.com/damienbod/angular-auth-oidc-client/issues/36) about how to make this happen, so I'm hoping to use this as a baseline for testing.

# Overview

The basic SSR template is from Mark Piezak's [JavaScript Services repo](https://github.com/aspnet/JavaScriptServices), and enhanced it with a few extra things:

- a storage service that is injected with different implementations for client-side rendering and server-side rendering (see [storage-config.ts](https://github.com/astegmaier/angular-auth-oidc-client-SSR-test/blob/master/ClientApp/app/config/storage-config.ts) for details)
    - the client-side implementation uses bouzuya's [cookie-storage](https://github.com/bouzuya/cookie-storage) so that tokens end up getting saved as cookies that get passed up to the server.
    - the server-side implementation uses [memorystorage](https://github.com/Download/memorystorage) and automatically populates itself based on values from the cookies.
- A basic configuration of [angular-auth-oidc-client](https://github.com/damienbod/angular-auth-oidc-client) - see [storage-config.ts](https://github.com/astegmaier/angular-auth-oidc-client-SSR-test/blob/master/ClientApp/app/config/auth-config.ts) for details.

# Setup

To get this repo running on your machine, do the following:

1. Make sure you have the latest versions of dotnet core (currently 2.0-preview2) and node installed
2. Clone the repo and run `dotnet restore` and `npm install`
3. For development goodness, set the environment to Development:
     - Mac: `export ASPNETCORE_ENVIRONMENT=Development`
     - Windows: `set ASPNETCORE_ENVIRONMENT=Development`
4. Start the application by running `dotnet watch run`
5. Try it out by visiting `http://localhost:5000` in the browser.

# Current Results
Currently, server-side rendering will not work because it looks like some parts of angular-auth-oidc-client are making calls to `window`, which isn't available on the server. You'll see this stack trace:
```
An unhandled exception occurred while processing the request.

Exception: Call to Node module failed with error: ReferenceError: window is not defined
at OidcSecuritySilentRenew.initRenew (C:\Users\ansteg\Projects\debug-test\ClientApp\dist\main-server.js:18288:45)
at OidcSecurityService.setupModule (C:\Users\ansteg\Projects\debug-test\ClientApp\dist\main-server.js:18446:42)
at Object.configAuth (C:\Users\ansteg\Projects\debug-test\ClientApp\dist\main-server.js:20725:26)
at new AppModule (C:\Users\ansteg\Projects\debug-test\ClientApp\dist\main-server.js:11778:23)
```
It appears to fail due to [these lines](https://github.com/damienbod/angular-auth-oidc-client/blob/master/src/services/oidc.security.silent-renew.ts#L14) in `oidc.security.silent-renew.ts`. However, it is likely that this is just the first failure hit and that there are others--because a [quick search](https://github.com/damienbod/angular-auth-oidc-client/search?utf8=%E2%9C%93&q=window&type=) of angular-auth-oidc-client reveals multiple references to `window`.

You can turn off server side rendering for testing purposes by changing [these lines in Index.cshtml](https://github.com/astegmaier/angular-auth-oidc-client-SSR-test/blob/master/Views/Home/Index.cshtml#L5):
```
<app asp-prerender-module="ClientApp/dist/main-server" asp-prerender-data="new { Cookies = ViewContext.HttpContext.Request.Cookies }">Loading...</app>
```
to
```
<app>Loading...</app>
```
