import {Component, Input} from '@angular/core';
import {Router} from '@angular/router-deprecated';

@Component({
  selector: 'as-sub-header',
  styleUrls: ['app/subheader/subheader.component.css'],
  templateUrl: 'app/subheader/subheader.component.html',
  directives: []
})
export class SubHeaderComponent {

  @Input()
  title: string;

  constructor(
    private _router: Router) {
  };

}
