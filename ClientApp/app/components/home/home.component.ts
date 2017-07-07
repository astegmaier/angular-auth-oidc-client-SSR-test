import { Component, Inject } from '@angular/core';
import { IStorage, STORAGE, COOKIES } from "../../config/storage-config";
import * as MemoryStorage from 'memorystorage';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(@Inject(STORAGE) private _storage: IStorage, @Inject(COOKIES) private _cookies: any) {}

    getStorage() {
        return JSON.stringify(this._storage);
    }

    SetACookie() {
        this._storage.setItem("firstcookie","ANOTHER VALUE!");
    }
}
