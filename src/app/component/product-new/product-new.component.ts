import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, forkJoin, switchMap,Observable  } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Comment } from '../comment';
@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent {
  selectedFiles !: FileList;
  currentFileUpload :any;
  percentage: number = 0;
  products:any
  product = new Product()
  errMessage:string=''
  sizetemp:string=""
  colortemp:string=""
  reviewTemp=new Comment();

  constructor(private service: ProductService, private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getProducts();
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }
// hàm gốc
  // async uploadFile() {
  //   //  this.currentFileUpload =  new FileMetaData(this.selectedFiles[0]);
  //   for (let i=0;i<this.selectedFiles.length;i++){
  //     const path = 'Products/'+this.selectedFiles[i].name;
  //     const storageRef = this.fireStorage.ref(path);
  //     const uploadTask = storageRef.put(this.selectedFiles[i]);

  //     await uploadTask.snapshotChanges().pipe(finalize( () => {
  //       storageRef.getDownloadURL().subscribe(downloadLink => {
  //         this.product.imgURL.push(downloadLink);
  //         console.log(this.testArray)
  //       })
  //       this.ngOnInit();
  //       })
  //       ).subscribe({
  //           next:(res : any) => {
  //           this.percentage = (res.bytesTransferred * 100 / res.totalBytes)
  //       },
  //           error:(err) => {
  //             console.log('Error occured');
  //             }
  //         });
  //   }
  //   this.product.size = this.sizetemp.split(',');
  //   this.product.color=this.colortemp.split(',');
  //   this.service.saveMetaDataOfFile(this.product);
  //   }

//hàm Kiên sửa
  // async uploadFile() {
  //   const uploadTasks = [];

  //   for (let i = 0; i < this.selectedFiles.length; i++) {
  //     const path = 'Products/' + this.selectedFiles[i].name;
  //     const storageRef = this.fireStorage.ref(path);
  //     const uploadTask = storageRef.put(this.selectedFiles[i]);

  //     uploadTasks.push(uploadTask);

  //     uploadTask.snapshotChanges().pipe(
  //       finalize(() => {
  //         storageRef.getDownloadURL().subscribe(downloadLink => {
  //           this.product.imgURL.push(downloadLink);
  //           console.log(this.product.imgURL);
  //         });
  //       })
  //     ).subscribe({
  //       next: (res: any) => {
  //         this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
  //       },
  //       error: (err) => {
  //         console.log('Error occurred:', err);
  //       }
  //     });

  //   }

  //   forkJoin(uploadTasks.map(task => task.snapshotChanges())).pipe(
  //     switchMap(() => {
  //       const downloadURLObservables = this.product.imgURL.map(url => {
  //         return this.fireStorage.refFromURL(url).getDownloadURL();
  //       });

  //       return forkJoin(downloadURLObservables);
  //     }),
  //     finalize(() => {
  //       // All metadata updates and download URLs are available, save metadata to Firestore here
  //       this.product.size = this.sizetemp.split(',');
  //       this.product.color = this.colortemp.split(',');
  //       console.log(this.product);

  //       this.service.saveMetaDataOfFile(this.product);
  //     })
  //   ).subscribe();

  // }

  async uploadFile() {
    const promises = [];

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const path = 'Products/' + this.selectedFiles[i].name;
      const storageRef = this.fireStorage.ref(path);
      const uploadTask = storageRef.put(this.selectedFiles[i]);

      const promise = new Promise((resolve, reject) => {
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadLink => {
              this.product.imgURL.push(downloadLink);
              resolve(undefined);
            }, reject);
          })
        ).subscribe({
          next: (res: any) => {
            this.percentage = (res.bytesTransferred * 100 / res.totalBytes);
          },
          error: (err) => {
            console.log('Error occurred');
            reject(err);
          }
        });
      });
      promises.push(promise);
    }

    // Wait for all promises to complete before continuing
    await Promise.all(promises);

    this.product.size = this.sizetemp.split(',');
    this.product.color = this.colortemp.split(',');
    this.product.reviews.push(this.reviewTemp);
    this.service.saveMetaDataOfFile(this.product);
    this.product = new Product();
  }

  getProducts() {
    this.service.getProducts().subscribe({
      next:(res:any) => {
        this.products = res.map((e : any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            //console.log(data);
            return data;
        });
    }, error:(err) => {
        this.errMessage=err
        console.log('Error occured while fetching file meta data');
    }
  })


  }
  //không xóa được hình lưu trong storage
  deleteProduct(product : Product) {
    if(window.confirm('Are you sure you want to delete '   + '?')) {
      this.service.deleteProduct(product);
      // this.ngOnInit();
   }

  }

  updateProduct(product : Product) {
    if(window.confirm('Are you sure you want to update '   + '?')) {
      // this.service.updateProduct(product);
      this.service.saveMetaDataOfFile(product);
      // this.ngOnInit();
   }

  }
}
