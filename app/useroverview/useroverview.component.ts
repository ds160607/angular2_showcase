import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import {UserService} from '../user.service';
import { DROPDOWN_DIRECTIVES } from '../lib/dropdown';
import { BUTTON_DIRECTIVES } from '../lib/buttons';
import { SubHeaderComponent }    from '../subheader/subheader.component';
import { UserFilterComponent }    from '../filter/user.filter.component';

@Component({
    selector: 'as-user-overview',
    styleUrls: ['app/useroverview/useroverview.component.css'],
    templateUrl: 'app/useroverview/useroverview.component.html',
    directives: [
        SubHeaderComponent,
        UserFilterComponent,
        DROPDOWN_DIRECTIVES,
        BUTTON_DIRECTIVES
    ]
})

export class UserOverviewComponent {

    @ViewChild('filter')
    userFilter: UserFilterComponent;

    title = 'User overview';
    public advancedSearch: boolean = false;
    constructor(
        private _router: Router,
        private _userService: UserService) {
    };

    advancedSearchToggle(): void {
        this.advancedSearch = !this.advancedSearch;
    }

    addRow(): void {
        this.userFilter.addRow();
    }
}
