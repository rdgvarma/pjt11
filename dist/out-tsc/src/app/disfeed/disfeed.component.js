import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import { CSVRecord } from '../CSVModels'
let DisfeedComponent = class DisfeedComponent {
    //variables related to conf data csv upload ends here 
    constructor(httpclient, dfeedservice) {
        this.httpclient = httpclient;
        this.dfeedservice = dfeedservice;
        this.submitted = false;
        //todayISOString : string = new Date().toISOString();
        this.tzoffset = (new Date()).getTimezoneOffset() * 60000;
        this.todayISOString = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -5);
    }
    ngOnInit() {
        this.dispencerForm = new FormGroup({
            udid: new FormControl(),
            gwid: new FormControl(),
            name: new FormControl(),
            pond: new FormControl(),
            weight: new FormControl(),
            time: new FormControl(),
            csvfile: new FormControl()
        });
    }
    onDFDataClick() {
        console.log("this dispencer form .values : " + JSON.stringify(this.dispencerForm.value));
        console.log(this.todayISOString);
        var b = this.todayISOString;
        this.data = {
            'udid': this.dispencerForm.value.udid,
            'gwid': this.dispencerForm.value.gwid,
            'name': this.dispencerForm.value.name,
            'pond': this.dispencerForm.value.pond,
            'weight': this.dispencerForm.value.weight,
            'time': this.dispencerForm.value.time,
            'usersystime': b,
        };
        this.dfeedservice.DFdata(this.data);
    }
    onPingDataClick() {
        console.log("this is from onPingDataClick : " + JSON.stringify(this.dispencerForm.value));
        let test;
        test = {
            'udid': this.dispencerForm.value.udid,
            'gwid': this.dispencerForm.value.gwid,
            'name': this.dispencerForm.value.name,
            'pond': this.dispencerForm.value.pond,
        };
        this.dfeedservice.PINGdata(test);
    }
    onGFIDataClick() {
        console.log("this is from onGFIDataClick : " + JSON.stringify(this.dispencerForm.value));
        let test1;
        test1 = {
            'udid': this.dispencerForm.value.udid,
            'gwid': this.dispencerForm.value.gwid,
            'name': this.dispencerForm.value.name,
            'pond': this.dispencerForm.value.pond,
        };
        this.dfeedservice.GFIdata(test1);
    }
    onCONFDataClick() {
        this.userdefid = this.dispencerForm.value.udid;
        this.confGwid = this.dispencerForm.value.gwid;
        console.log("line 99 : " + this.userdefid);
        //  this.uploadListener(Event);
        this.telico();
    }
    //execution code related to conf data csv upload file 
    uploadListener($event) {
        let text = [];
        let files = $event.srcElement.files;
        if (this.isValidCSVFile(files[0])) {
            let input = $event.target;
            let reader = new FileReader();
            reader.readAsText(input.files[0]);
            reader.onload = () => {
                let csvData = reader.result;
                this.csvRecordsArray = csvData.split(/\r\n|\n/);
                let headersRow = this.getHeaderArray(this.csvRecordsArray);
                console.log(" this.records in line 119 : " + this.csvRecordsArray);
                this.telico();
            };
            reader.onerror = function () {
                console.log('error is occured while reading file!');
            };
        }
        else {
            alert("Please import valid .csv file.");
            this.fileReset();
        }
    }
    isValidCSVFile(file) {
        return file.name.endsWith(".csv");
    }
    getHeaderArray(csvRecordsArr) {
        let headers = csvRecordsArr[0].split(',');
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }
    fileReset() {
        this.csvReader.nativeElement.value = "";
        this.records = [];
    }
    telico() {
        let test1;
        if (this.userdefid == undefined && this.confGwid == undefined && this.csvRecordsArray == undefined) {
            console.log("line 207  data does not  present...");
        }
        else {
            console.log("line 199 data present...");
            test1 = {
                'udid': this.userdefid,
                'gwid': this.confGwid,
                'csv': this.csvRecordsArray
            };
            console.log("line 193 : " + JSON.stringify(test1));
            this.dfeedservice.mrcsv(test1);
        }
    }
};
DisfeedComponent = __decorate([
    Component({
        selector: 'app-disfeed',
        templateUrl: './disfeed.component.html',
        styleUrls: ['./disfeed.component.css']
    })
], DisfeedComponent);
export { DisfeedComponent };
//# sourceMappingURL=disfeed.component.js.map