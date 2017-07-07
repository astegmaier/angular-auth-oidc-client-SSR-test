import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { memoryStorageFactory, STORAGE, SERVER_COOKIES } from "./config/storage-config";

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        AppModuleShared
    ],
    providers: [
        { provide: STORAGE, useFactory: memoryStorageFactory, deps: [SERVER_COOKIES] }
    ]
})
export class AppModule {
}
