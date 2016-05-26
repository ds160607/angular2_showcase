import { Component, Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { DROPDOWN_DIRECTIVES } from '../lib/dropdown';
import { BUTTON_DIRECTIVES } from '../lib/buttons';
import { IFilter } from './ifilter.interface';
import { FilterRow } from './filterrow';
import { FilterRowComponent } from './filterrow.component';

@Component({
    selector: 'as-user-filter',
    exportAs: 'user_filter_component',
    styleUrls: ['app/filter/user.filter.component.css'],
    templateUrl: 'app/filter/user.filter.component.html',
    directives: [
        DROPDOWN_DIRECTIVES,
        BUTTON_DIRECTIVES,
        FilterRowComponent
    ]
})
@Injectable()
export class UserFilterComponent implements OnInit, IFilter {

    public rows: FilterRow[] = [
    ];

    ngOnInit() {
        this.rows = [
            new FilterRow(this)
        ];
    }

    getKeys(): string[] {
        return [
            'Replies',
            'Topics',
            'Solved',
            'User group',
            'Registration date',
            'Last login'
        ];
    }

    getOperandsForKey(key: string): { 'operands': string[], 'isMulti': boolean } {
        switch (key) {
            case 'Replies':
            case 'Topics':
            case 'Solved':
                return {
                    'isMulti': false, 'operands': [
                        'Is greater than',
                        'Is smaller than',
                        'Equals'
                    ]
                };
            case 'User group':
                return {
                    'isMulti': true, 'operands': [
                        'Captain',
                        'Colonel',
                        'General',
                        'Lieutenant',
                        'Officer'
                    ]
                };
            case 'Registration date':
            case 'Last login':
                return {
                    'isMulti': false, 'operands': [
                        'Before',
                        'After',
                        'Exact date'
                    ]
                };
        }
    }

    getValueTypeForKey(key: string): string {
        switch (key) {
            case 'Replies':
            case 'Topics':
            case 'Solved':
                return 'text';
            case 'User group':
                return 'none';
            case 'Registration date':
            case 'Last login':
                return 'date';
        }
    }

    addRow(): void {
        this.rows.push(new FilterRow(this));
    }

    removeRow(row: FilterRow) {
        this.rows.splice(this.rows.indexOf(row), 1);
    }

}
