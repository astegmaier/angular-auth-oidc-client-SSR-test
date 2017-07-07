import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
import { memoryStorageFactory, STORAGE, COOKIES } from "./config/storage-config";

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        ServerModule,
        AppModuleShared
    ],
    providers: [
        { provide: STORAGE, useFactory: memoryStorageFactory, deps: [COOKIES] }
    ]
})
export class AppModule {
}
