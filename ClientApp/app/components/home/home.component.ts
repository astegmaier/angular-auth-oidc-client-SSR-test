import { Component, Inject } from '@angular/core';
import { IStorage, STORAGE } from "../../config/storage-config";
import * as MemoryStorage from 'memorystorage';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(@Inject(STORAGE) private _storage: IStorage) {}

    createMemoryStorage() {
        //const myStorage = new MemoryStorage(); 
        // console.log(MemoryStorage);
        // const test = new MemoryStorage();
        // test.setItem('myKey','hellofrommy');
        // console.log(test.getItem('myKey'));
        this._storage.setItem('myKey','hellofrommy');
        console.log(this._storage.getItem('myKey'));
    }
}
