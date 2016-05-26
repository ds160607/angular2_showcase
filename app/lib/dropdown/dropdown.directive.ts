import {
    Directive, OnInit, OnDestroy, Input, Output, HostBinding, EventEmitter,
    ElementRef, Renderer
} from '@angular/core';
import {dropdownService, NONINPUT} from './dropdown.service';

@Directive(
    {
        selector: '[dropdown]',
        exportAs: 'dropdown_directive'
    }
)
export class DropDownDirective implements OnInit, OnDestroy {
    @HostBinding('class.open')
    @Input()
    public get isOpen(): boolean {
        return this._isOpen;
    }

    @Input() public autoClose: string;
    @Input() public keyboardNav: boolean;
    // enum string: ['always', 'outsideClick', 'disabled']
    @Input() public appendToBody: boolean;

    @Output() public onToggle: EventEmitter<boolean> = new EventEmitter(false);
    @Output() public isOpenChange: EventEmitter<boolean> = new EventEmitter(false);
    @HostBinding('class.dropdown') public addClass: boolean = true;

    // index of selected element
    public selectedOption: number;
    public selectedItems: any[] = [];

    @Output() selectItem: EventEmitter<any[]> = new EventEmitter();

    // drop menu html
    public menuEl: ElementRef;
    // drop down toggle element
    public toggleEl: ElementRef;
    public el: ElementRef;

    public isMultiSelect: boolean;
    private _isOpen: boolean;


    public constructor(el: ElementRef, public renderer: Renderer) {
        // @Query('dropdownMenu', {descendants: false})
        // dropdownMenuList:QueryList<ElementRef>) {
        this.el = el;
        this.renderer = renderer;
        // todo: bind to route change event
        this.isMultiSelect = this.el.nativeElement.getAttribute('multiselect');
    }

    public triggerSelectedItemsChange(): void {
        this.selectItem.next(this.selectedItems);
    }

    public updateToggler(): void {
        if (this.selectedItems.length === 0) {
            this.renderer.setElementStyle(this.toggleEl.nativeElement.children[0], 'color', '#999999');
            this.toggleEl.nativeElement.children[0].innerText = this.toggleEl.nativeElement.getAttribute('placeholder');
        } else if (this.selectedItems.length === 1) {
            this.renderer.setElementStyle(this.toggleEl.nativeElement.children[0], 'color', 'initial');
            this.toggleEl.nativeElement.children[0].innerText = this.selectedItems[0].children[0].innerText;
        } else if (this.selectedItems.length > 1) {
            this.renderer.setElementStyle(this.toggleEl.nativeElement.children[0], 'color', 'initial');
            this.toggleEl.nativeElement.children[0].innerText = this.selectedItems.length + ' items selected';
        }
    }

    public set isOpen(value: boolean) {
        this._isOpen = !!value;

        // todo: implement after porting position
        // if (this.appendToBody && this.menuEl) {
        //
        // }

        // todo: $animate open<->close transitions, as soon as ng2Animate will be
        // ready
        if (this.isOpen) {
            this.focusToggleElement();
            dropdownService.open(this);
        } else {
            dropdownService.close(this);
            this.selectedOption = void 0;
        }
        this.onToggle.emit(this.isOpen);
        this.isOpenChange.emit(this.isOpen);
        // todo: implement call to setIsOpen if set and function
    }

    public ngOnInit(): void {
        this.autoClose = this.autoClose || NONINPUT;
        if (this.isOpen) {
            // todo: watch for event get-isOpen?
        }
    }

    public ngOnDestroy(): void {
        if (this.appendToBody && this.menuEl) {
            this.menuEl.nativeElement.remove();
        }
    }

    public set dropDownMenu(dropdownMenu: { el: ElementRef }) {
        // init drop down menu
        this.menuEl = dropdownMenu.el;

        if (this.appendToBody) {
            window.document.body.appendChild(this.menuEl.nativeElement);
        }
    }

    public set dropDownToggle(dropdownToggle: { el: ElementRef }) {
        // init toggle element
        this.toggleEl = dropdownToggle.el;
        this.renderer.setElementStyle(this.toggleEl.nativeElement.children[0], 'color', '#999999');
    }

    public toggle(open?: boolean): boolean {
        return this.isOpen = arguments.length ? !!open : !this.isOpen;
    }

    public focusDropdownEntry(keyCode: number): void {
        // If append to body is used.
        let hostEl = this.menuEl ?
            this.menuEl.nativeElement :
            this.el.nativeElement.getElementsByTagName('ul')[0];

        if (!hostEl) {
            // todo: throw exception?
            return;
        }

        let elems = hostEl.getElementsByTagName('a');
        if (!elems || !elems.length) {
            // todo: throw exception?
            return;
        }

        // todo: use parseInt to detect isNumber?
        // todo: or implement selectedOption as a get\set pair with parseInt on set
        switch (keyCode) {
            case (40):
                if (typeof this.selectedOption !== 'number') {
                    this.selectedOption = 0;
                    break;
                }

                if (this.selectedOption === elems.length - 1) {
                    break;
                }

                this.selectedOption++;
                break;
            case (38):
                if (typeof this.selectedOption !== 'number') {
                    return;
                }

                if (this.selectedOption === 0) {
                    // todo: return?
                    break;
                }

                this.selectedOption--;
                break;
            default:
                break;
        }

        elems[this.selectedOption].focus();
    }

    public focusToggleElement(): void {
        if (this.toggleEl) {
            this.toggleEl.nativeElement.focus();
        }
    }
}
