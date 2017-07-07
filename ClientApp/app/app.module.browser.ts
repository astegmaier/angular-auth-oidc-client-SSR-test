import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { cookieStorageFactory, STORAGE, SERVER_COOKIES } from "./config/storage-config";


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        { provide: STORAGE, useFactory: cookieStorageFactory },
        { provide: SERVER_COOKIES, useValue: "no server cookies!" }
    ]
})
export class AppModule {
}
