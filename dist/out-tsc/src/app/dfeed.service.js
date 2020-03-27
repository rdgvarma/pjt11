import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let DfeedService = class DfeedService {
    constructor(_httpClient) {
        this._httpClient = _httpClient;
        //post data to server
        this._url = "http://192.168.1.55:7081/api/feed-dis/data";
        this._url1 = "http://192.168.1.55:7081/api/feed-dis/ping-data";
        this._url2 = "http://192.168.1.55:7081/api/feed-dis/gfi-data";
        this._url3 = "http://192.168.1.55:7081/api/feed-dis/conf-data";
    }
    DFdata(params) {
        return this._httpClient.post(this._url, params)
            .subscribe((data) => (console.log("this is from updatepostData () :" + JSON.stringify(data))));
    }
    ;
    PINGdata(params) {
        console.log("this is from PINGdata");
        return this._httpClient.post(this._url1, params)
            .subscribe((data) => (console.log("this is from updatepostPINGdata () :" + JSON.stringify(data))));
    }
    ;
    GFIdata(params) {
        return this._httpClient.post(this._url2, params)
            .subscribe((data) => (console.log("this is from updatepostPINGdata () :" + JSON.stringify(data))));
    }
    //send single recods to db from csv
    mrcsv(params) {
        return this._httpClient.post(this._url3, params)
            .subscribe((data) => (console.log("this is from sendData () :" + JSON.stringify(data))));
    }
};
DfeedService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DfeedService);
export { DfeedService };
//# sourceMappingURL=dfeed.service.js.map