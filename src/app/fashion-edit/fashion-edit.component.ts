import { HttpClient, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, Input } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { Fashion } from '../fashion';
import { FashionAPIService } from '../fashion-api.service';


@Component({
  selector: 'app-fashion-edit',
  templateUrl: './fashion-edit.component.html',
  styleUrls: ['./fashion-edit.component.css']
})
export class FashionEditComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    // @ts-ignorets~ignore
    new FroalaEditor("#editor")
  }

  options: any = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    toolbarButtons: ['bold', 'italic', 'underline', 'insertImage', 'insertLink']
  };


  file:any;
  fashion=new Fashion();
  fashions:any
  errMessage:string=''
  constructor(private _service:FashionAPIService, private _http: HttpClient){
    var currentURL=window.location.href
    var arr=currentURL.split('/')
    var id=arr[arr.length-1];
    this.fashion._id=id;
  }


  putFashion()
  {

    this._service.putFashion(this.fashion).subscribe({
      next:(data)=>{this.fashions=data},
      error:(err)=>{this.errMessage=err}
  })

  }

  @Input()
  requiredFileType:any;
  fileName = '';
  uploadProgress:number=0;
  uploadSub: Subscription=new Subscription();



  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }
  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
  }
  public setFashion(f:Fashion)
  {
  this.fashion=f
  }
  onFileSelected(event:any,fashion:Fashion) {
  let me = this;
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
  fashion.fashion_image=reader.result!.toString()
  };
  reader.onerror = function (error) {
  console.log('Error: ', error);
  };
  }
}
