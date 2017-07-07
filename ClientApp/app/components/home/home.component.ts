import { Component, Inject } from '@angular/core';
import { IStorage, STORAGE, SERVER_COOKIES } from "../../config/storage-config";
import * as MemoryStorage from 'memorystorage';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(@Inject(STORAGE) private _storage: IStorage, @Inject(SERVER_COOKIES) private _cookies: any) {}

    createMemoryStorage() {
        // this._storage.setItem('myKey','hellofrommy');
        // console.log(this._storage.getItem('myKey'));
        console.log(this._cookies);
    }

    getCookies() {
        return JSON.stringify(this._cookies);
    }
}
