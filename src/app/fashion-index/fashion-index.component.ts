import { Component } from '@angular/core';
import { FashionAPIService } from '../fashion-api.service';

@Component({
  selector: 'app-fashion-index',
  templateUrl: './fashion-index.component.html',
  styleUrls: ['./fashion-index.component.css']
})
export class FashionIndexComponent {
  title = 'admin-fashion';
  fashions:any;
  errMessage:string=''
  constructor(private _service: FashionAPIService){
  // this._service.getFashions().subscribe({
  // next:(data)=>{this.fashions=data},
  // error:(err)=>{this.errMessage=err}
  // })
    this._service.getAllfashions().subscribe({
      next:(res)=>{
        this.fashions = res.map((e: any) => {
          return this.filter(e.payload.doc.data())
        })
          console.log(this.fashions)
      },
      error:(err)=>{this.errMessage=err}
    })

  }
  filter(x:any){}



  clickMethod(Id: string) {
    if(confirm("Are you sure to delete")) {
      this.delete(Id)
    }

  }

  delete(Id:any){
    return this._service.deleteFashion(Id).subscribe({
      next:(data)=>{this.fashions=data},
      error:(err)=>{this.errMessage=err}
  })
}
}
