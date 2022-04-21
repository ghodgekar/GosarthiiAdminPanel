import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DriverService } from '@services/driver.service';

@Component({
  selector: 'app-driver-enrollment',
  templateUrl: './driver-enrollment.component.html',
  styleUrls: ['./driver-enrollment.component.scss']
})
export class DriverEnrollmentComponent implements OnInit{
  allUsers: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  defaultStatus:string='1';
  constructor(private router: Router, private driverservice:DriverService) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['pageLength', 'copy', 'print', 'csv','pdf','excel']
    };
    this.users();
  }

  users(): void {
    this.driverservice.getAllDriver(this.defaultStatus).subscribe((response: any) => {
      this.allUsers = response;
      this.dtTrigger.next();
    })
  }

  getDriverDetails(driver_id):void{
    this.router.navigate(['/self-enrolled-driver-details',driver_id]);
  }

  getTableData(id):void{
    this.defaultStatus = id;
    this.users();
  }
}
