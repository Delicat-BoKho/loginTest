import { AfterContentChecked, AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FashionAPIService } from './fashion-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(private router: Router) { }

  // ngOnInit() {
  //   this.router.navigate(['/fileupload']);
  // }
}
