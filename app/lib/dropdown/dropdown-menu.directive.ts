import {Directive, ElementRef, Host, OnInit, Renderer} from '@angular/core';
import {DropDownDirective} from './dropdown.directive';

@Directive({ selector: '[dropdownMenu]' })
export class DropDownMenuDirective implements OnInit {

    public dropdown: DropDownDirective;
    public el: ElementRef;
    public constructor( @Host() dropdown: DropDownDirective, el: ElementRef, public renderer: Renderer) {
        this.dropdown = dropdown;
        this.el = el;
    }

    public ngOnInit(): void {
        this.dropdown.dropDownMenu = this;
    }

    public toggleMe(value: ElementRef): void {

        if (this.dropdown.isMultiSelect) {
            let index = this.dropdown.selectedItems.indexOf(value.nativeElement);
            if (index + 1) {
                this.dropdown.selectedItems.splice(index, 1);
                this.dropdown.triggerSelectedItemsChange();
                console.log('diselected: ' + value.nativeElement.innerText);
            } else {
                this.dropdown.selectedItems.push(value.nativeElement);
                this.dropdown.triggerSelectedItemsChange();
                console.log('selected: ' + value.nativeElement.innerText);
            }
        } else {
            this.dropdown.selectedItems = [value.nativeElement];
            this.dropdown.triggerSelectedItemsChange();
            this.dropdown.toggle(false);
        }

        let children = this.el.nativeElement.children;
        for (let i = 0; i < children.length; i++) {
            if (children.item(i) === value.nativeElement) {
                this.dropdown.selectedOption = i;
            }
            this.refreshItem(children.item(i));
        }

        this.dropdown.updateToggler();
    }

    public isSelected(item: ElementRef): boolean {
        return (this.dropdown.selectedItems.indexOf(item) + 1) ? true : false;
    }

    private refreshItem(item: ElementRef): void {
        if (this.isSelected(item)) {
            this.renderer.setElementClass(item, 'selected', true);
        } else {
            this.renderer.setElementClass(item, 'selected', false);
        }
    }
}
