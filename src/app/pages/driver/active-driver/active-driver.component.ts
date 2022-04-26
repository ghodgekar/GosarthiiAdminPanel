import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverService } from '@services/driver.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-active-driver',
  templateUrl: './active-driver.component.html',
  styleUrls: ['./active-driver.component.scss']
})
export class ActiveDriverComponent implements OnInit {
  allUsers: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  closeResult: string = '';
  driver_form: FormGroup;
  StateCity: any;
  constructor(private http: HttpClient,private router: Router,private modalService: NgbModal,private fb: FormBuilder, private driverservice:DriverService,private notifyService : NotificationService) { }
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
    this.driverservice.getAllDriver("4").subscribe((response: any) => {
      this.allUsers = response;
      this.dtTrigger.next();
    })
  }

  getDriverDetails(driver_id):void{
    this.router.navigate(['/driver-details',driver_id]);
  }
}
