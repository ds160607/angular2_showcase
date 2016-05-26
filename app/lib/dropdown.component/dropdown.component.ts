import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import { DropDownDirective,
    DropDownToggleDirective,
    DropDownMenuDirective,
    DropDownMenuItemDirective,
    KeyboardNavDirective } from '../dropdown';

@Component({
    selector: 'as-dropdown',
    exportAs: 'dropdown_component',
    styleUrls: ['app/lib/dropdown.component/dropdown.component.css'],
    templateUrl: 'app/lib/dropdown.component/dropdown.component.html',
    directives: [
        DropDownDirective,
        DropDownToggleDirective,
        DropDownMenuDirective,
        DropDownMenuItemDirective,
        KeyboardNavDirective
    ]
})
export class DropDownComponent implements AfterViewInit {

    @ViewChild('dd')
    dropdownDirective: DropDownDirective;

    @Input()
    placeholder: string = 'choose...';

    @Output()
    selectItem: EventEmitter<any[]> = new EventEmitter();

    public items: string[] = [];
    public selectedItems: any[] = [];

    ngAfterViewInit() {
        this.dropdownDirective.selectItem.subscribe((items) => {
            console.log('DropDownComponent event: ', items[0].children[0].innerText);
            this.selectItem.next(items);
        });
    }
}
