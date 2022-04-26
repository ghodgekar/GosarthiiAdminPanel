import {Component, OnInit} from '@angular/core';
import { DriverService } from '@services/driver.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    driverSearch:boolean=false;
    noDataStatus:boolean;
    driverSearchType:any;
    driverInput:string;
    userData: any=[];
    constructor(private driverservice:DriverService) { }
    ngOnInit(): void {
    }

    onItemChange(value){
        this.driverSearchType = value;
    }

    getDriverInfo(){
        let searchQuery;
        if(this.driverSearchType == 0){
            searchQuery = 'driver_id=' + this.driverInput;
        }else if(this.driverSearchType == 2){
            searchQuery = 'driver_phone=' + this.driverInput;
        }
        this.driverservice.getDriverSearch(searchQuery).subscribe(res => {
            if (Array.isArray(res) && res.length) {
                this.driverSearch=true;
                this.noDataStatus=false;
                this.userData=res[0];
            }else{
                this.driverSearch=false;
                this.noDataStatus=true;
            }
        })
    }
}
