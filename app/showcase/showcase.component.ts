import { Component, ViewChild }         from '@angular/core';
import { OnInit, AfterViewInit }        from '@angular/core';
import { UserService }                  from '../user.service';
import { UserOverviewComponent }        from '../useroverview/useroverview.component';
import { NotImplementedComponent }      from '../notimplemented/notimplemented.component';
import { HeaderComponent }              from '../header/header.component';
import { MenuComponent }                from '../menu/menu.component';
import { Menu }                         from '../models/menu';
import { MenuSection }                  from '../models/menu_section';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@Component({
    selector: 'as-showcase-app',
    templateUrl: 'app/showcase/showcase.component.html',
    styleUrls: ['app/showcase/showcase.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent,
        MenuComponent
    ],
    providers: [
        ROUTER_PROVIDERS,
        UserService
    ]
})
@RouteConfig([
    {
        path: '/users/overview',
        name: 'UserOverview',
        component: UserOverviewComponent,
        useAsDefault: false
    },
    {
        path: '/not_implemented',
        name: 'NotImplemented',
        component: NotImplementedComponent,
        useAsDefault: true
    }
])
export class ShowcaseComponent implements OnInit, AfterViewInit {

    @ViewChild(MenuComponent)
    menuComponent: MenuComponent;

    menu: Menu = new Menu();
    title: string = '';

    currentSection: MenuSection = new MenuSection('', '');
    currentSubSection: MenuSection;

    constructor(private _router: Router) {

    }

    ngOnInit() {
        this.menu.addItems(
            [
                new MenuSection('Forum', 'insided-comment', [], null, { route: 'NotImplemented' }),
                new MenuSection('Blog', 'insided-paint-brush', [], null, { route: 'NotImplemented' }),
                new MenuSection('Research', 'insided-flask', [], null, { route: 'NotImplemented' }),
                new MenuSection('Inbox', 'insided-inbox', [], null, { route: 'NotImplemented' }),
                new MenuSection('Users', 'insided-user', [
                    new MenuSection('Overview', '', [], null, { route: 'UserOverview' }),
                    new MenuSection('Moderation', '', [], null, { route: 'NotImplemented' }),
                    new MenuSection('Add user', '', [], null, { route: 'NotImplemented' }),
                ], 0),
                new MenuSection('Settings', 'insided-cog', [], null, { route: 'NotImplemented' })
            ], 4);
    }

    ngAfterViewInit() {
        this.menuComponent.selectItem.subscribe((item) => {

            this.title = item.title + ' !!!';
            if (item.parent) {
                this.title = item.parent.title + ' ' + this.title;
            }

            this._router.navigate([item.data.route]);

            console.log('event: ' + this.title);
        });
    }
}
