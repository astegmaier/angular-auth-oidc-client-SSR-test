import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { cookieStorageFactory, STORAGE } from "./config/storage-config";


@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        { provide: STORAGE, useFactory: cookieStorageFactory }
    ]
})
export class AppModule {
}
