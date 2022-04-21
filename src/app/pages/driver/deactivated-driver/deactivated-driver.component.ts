import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DriverService } from '@services/driver.service';

@Component({
  selector: 'app-deactivated-driver',
  templateUrl: './deactivated-driver.component.html',
  styleUrls: ['./deactivated-driver.component.scss']
})
export class DeactivatedDriverComponent implements OnInit {
  allUsers: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  constructor(private http: HttpClient,private router: Router,public driverservice:DriverService) { }
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
    this.driverservice.getAllDriver("3").subscribe((response: any) => {
      this.allUsers = response;
      this.dtTrigger.next();
    })
  }
  getDriverDetails(driver_id):void{
    this.router.navigate(['/driver-details',driver_id]);
  }
}
