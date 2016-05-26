import { Component, Input, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { BUTTON_DIRECTIVES } from '../lib/buttons';
import { IFilter } from './ifilter.interface';
import { FilterRow } from './filterrow';
import { DropDownComponent } from '../lib/dropdown.component/dropdown.component';

@Component({
    selector: 'as-filter-row',
    styleUrls: ['app/filter/filterrow.component.css'],
    templateUrl: 'app/filter/filterrow.component.html',
    directives: [
        BUTTON_DIRECTIVES,
        DropDownComponent
    ]
})
export class FilterRowComponent implements AfterViewInit {
    public row: FilterRow;

    @Input()
    filter: IFilter;

    @ViewChild('key')
    keyDropdown: DropDownComponent;

    @ViewChild('operand')
    operandDropdown: DropDownComponent;

    @ViewChild('value')
    value: Element;

    ngAfterViewInit() {
        console.log(this.filter.getKeys());
        let self = this;
        setTimeout(() => {
            self.keyDropdown.items = self.filter.getKeys();
        }, 0);
        this.keyDropdown.selectItem.subscribe((items) => {
            console.log('FilterRowComponent event: ', items[0].children[0].innerText);
            let list = this.filter.getOperandsForKey(items[0].children[0].innerText);
            this.operandDropdown.items = list.operands;
        });
    }
}
