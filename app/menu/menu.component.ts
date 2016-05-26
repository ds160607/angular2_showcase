import {Component, Input, Output, EventEmitter} from '@angular/core';
import {AfterContentInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {Menu} from '../models/menu';
import {MenuSection} from '../models/menu_section';

@Component({
    selector: 'as-menu',
    styleUrls: ['app/menu/menu.component.css'],
    templateUrl: 'app/menu/menu.component.html',
    directives: []
})
export class MenuComponent implements AfterContentInit {

    @Input() menu: Menu = new Menu();

    @Output() selectItem: EventEmitter<MenuSection> = new EventEmitter();

    constructor(
        private _router: Router) {
    };


    ngAfterContentInit() {
        setTimeout(() => this.selectItem.next(this.menu.selectedItem), 0);
    }

    isSelected(item: MenuSection) {
        return (this.menu.selectedItem === item) || (item === this.menu.selectedItem.parent);
    }

    hasOpenedSubItems(item: MenuSection) {
        // console.log(item, isSelected(item), (item.subSections.length > 0));
        return this.isSelected(item) && item.subSections && (item.subSections.length > 0);
    }

    onSelect(item: MenuSection) {
        if (item.parent) {
            this.menu.selectedItem = item;
        } else {
            this.menu.selectedItem = item;

            if (item.subSections) {
                if (item.subSections.length > 0) {
                    this.menu.selectedItem = item.subSections[0];
                }
            }
        }
        this.selectItem.next(this.menu.selectedItem);
    }
}
