import {Directive, ElementRef, Host, OnInit, Input, HostBinding, HostListener, Renderer} from '@angular/core';
import {DropDownMenuDirective} from './dropdown-menu.directive';

@Directive({ selector: '[menuItem]' })
export class DropDownMenuItemDirective implements OnInit {
    @HostBinding('class.disabled')
    @Input() public disabled: boolean = false;

    public dropdownMenu: DropDownMenuDirective;
    public el: ElementRef;
    public selected: boolean;

    public constructor( @Host() dropdownMenu: DropDownMenuDirective, el: ElementRef, public renderer: Renderer) {
        this.dropdownMenu = dropdownMenu;
        this.el = el;
        this.selected = this.dropdownMenu.isSelected(el);
    }

    public ngOnInit(): void {
        // this.dropdown.dropdownMenu = this;
    }

    @HostListener('click', ['$event'])
    public toggleDropdown(event): boolean {
        event.stopPropagation();
        if (!this.disabled) {
            this.dropdownMenu.toggleMe(this.el);
        }
        return false;
    }
}
