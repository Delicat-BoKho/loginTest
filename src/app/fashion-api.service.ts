import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, catchError, throwError } from 'rxjs';
import { Fashion, IFashion } from './fashion';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FashionAPIService {

  constructor(private _http: HttpClient, private afs:AngularFirestore,private fireStorage : AngularFireStorage) { }

  // add fashion
  addfashion(fashion : Fashion) {
    fashion._id = this.afs.createId();
    return this.afs.collection('/fashions').add(fashion);
  }

  // get all fashions
  getAllfashions() {
    return this.afs.collection('/Phi').snapshotChanges();
  }//snapshot là firebase sửa là sửa luôn

  // delete fashion
  deletefashion(fashion : Fashion) {
     this.afs.doc('/fashions/'+fashion._id).delete();
  }

  // update fashion
  updatefashion(fashion : Fashion) {
    this.deletefashion(fashion);
    this.addfashion(fashion);
  }
// ---------------------------------------------------------
  getFashions():Observable<any>{
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
    const requestOptions:Object={
    headers:headers,
    responseType:"text"
    }
    return this._http.get<any>("/fashions",requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<IFashion>),
    retry(3),
    catchError(this.handleError))
    }
    handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
    }

  postFashion(aFashion:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf8")
    const requestOptions:Object={
    headers:headers,
    responseType:"text"
    }
    return this._http.post<any>("/fashions",JSON.stringify(aFashion),requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<IFashion>),
    retry(3),
    catchError(this.handleError))
  }

  deleteFashion(FashionId:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
    headers:headers,
    responseType:"text"
    }
    return this._http.delete<any>("/fashions/"+FashionId,requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<IFashion>),
    retry(3),
    catchError(this.handleError))
  }

  putFashion(aFashion:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
    headers:headers,
    responseType:"text"
  }
  return this._http.put<any>("/fashions",JSON.stringify(aFashion),requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<IFashion>),
    retry(3),
    catchError(this.handleError))
  }

  getFashion(FashionId:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8")
    const requestOptions:Object={
    headers:headers,
    responseType:"text"
  }
  return this._http.get<any>("/fashions/"+FashionId,requestOptions).pipe(
    map(res=>JSON.parse(res) as IFashion),
    retry(3),
    catchError(this.handleError))
  }
}
