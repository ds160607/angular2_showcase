import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';

@Component({
    selector: 'as-header',
    styleUrls: ['app/header/header.component.css'],
    templateUrl: 'app/header/header.component.html',
    directives: []
})
export class HeaderComponent {

    constructor(
        private _router: Router) {
    };

}
