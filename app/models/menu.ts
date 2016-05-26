import { MenuSection }   from './menu_section';

export class Menu {

    items: MenuSection[];
    selectedItem: MenuSection = null;

    addItems(values: MenuSection[], selectedIndex: number) {

        this.items = [];
        this.selectedItem = null;

        if (values && values.length > 0) {
            for (let i = 0; i < values.length; i++) {
                this.addItem(values[i], i === selectedIndex);
            }
        }
    }

    addItem(item: MenuSection, isSelected: boolean): MenuSection {
        item.parent = null;
        this.items.push(item);

        if (isSelected) {
            if (item.selectedSubItem) {
                this.selectedItem = item.selectedSubItem;
            } else {
                this.selectedItem = item;
            }
        }

        return item;
    }
}
