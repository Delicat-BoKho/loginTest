import { Component } from '@angular/core';
import { FashionAPIService } from '../fashion-api.service';

@Component({
  selector: 'app-fashion-details',
  templateUrl: './fashion-details.component.html',
  styleUrls: ['./fashion-details.component.css']
})
export class FashionDetailsComponent {
  fashion:any
  errMessage: any;
  constructor(private _service: FashionAPIService){

    var currentURL=window.location.href
    var arr=currentURL.split('/')
    var id=arr[arr.length-1];
    console.log(id)

    this._service.getFashion(id).subscribe({
      next:(data)=>{this.fashion=data},
      error:(err)=>{this.errMessage=err}})
  }
}
