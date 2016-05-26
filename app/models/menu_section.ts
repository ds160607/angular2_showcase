export class MenuSection {

  parent: MenuSection;
  subSections: MenuSection[] = [];
  selectedSubItem: MenuSection;

  public title: string;
  public data: any;
  public icon: string;

  constructor(title: string, icon: string, subItems?: MenuSection[], selectedIndex?: number, data?: any) {

    this.title = title;
    this.data = data;
    this.icon = (icon) ? icon : '';

    if (subItems) {
      for (let i = 0; i < subItems.length; i++) {
        this.addSubItem(subItems[i], i === selectedIndex);
      }
    }
  }

  addSubItem(item: MenuSection, isSelected: boolean): MenuSection {
    item.parent = this;
    this.subSections.push(item);

    if (isSelected) {
      this.selectedSubItem = item;
    }

    return item;
  }
}
