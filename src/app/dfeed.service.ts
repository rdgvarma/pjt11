import { Injectable } from '@angular/core';
import { Idisfeed } from '../credentials';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class DfeedService {
  
//post data to server
private _url:string ="http://192.168.1.55:7081/api/feed-dis/data";
private _url1:string ="http://192.168.1.55:7081/api/feed-dis/ping-data";
private _url2:string ="http://192.168.1.55:7081/api/feed-dis/gfi-data";
private _url3:string = "http://192.168.1.55:7081/api/feed-dis/conf-data";


  constructor(private _httpClient:HttpClient) { }

   DFdata(params) {
    return this._httpClient.post(this._url,params)
    .subscribe((data:any)=> (console.log("this is from updatepostData () :"+ JSON.stringify(data))))
  };

  PINGdata(params){
    console.log("this is from PINGdata");
    return this._httpClient.post(this._url1,params)
    .subscribe((data:any)=> (console.log("this is from updatepostPINGdata () :"+ JSON.stringify(data))))
  };

  GFIdata(params){
    return this._httpClient.post(this._url2,params)
    .subscribe((data:any)=> (console.log("this is from updatepostPINGdata () :"+ JSON.stringify(data))))
  }

  //send single recods to db from csv
  mrcsv(params){
    return this._httpClient.post(this._url3,params)
      .subscribe((data:any)=> (console.log("this is from sendData () :"+ JSON.stringify(data))))
  }
  //send single recods to db from csv


}
