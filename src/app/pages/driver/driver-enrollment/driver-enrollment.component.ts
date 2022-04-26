import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DriverService } from '@services/driver.service';
import { NotificationService } from '@services/notification.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  closeResult: string = '';
  driver_form: FormGroup;
  StateCity: any;
  constructor(private router: Router, private driverservice:DriverService,private modalService: NgbModal,private fb: FormBuilder,private notifyService : NotificationService) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      dom: 'Bfrtip',
      buttons: ['pageLength', 'copy', 'print', 'csv','pdf','excel']
    };
    this.users();
    this.createDriverData();
    this.getStateCityData();
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
    this.driverservice.getAllDriver(id).subscribe((response: any) => {
      this.allUsers = response;
    })
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  getStateCityData(){
    this.driverservice.getStateCityData().subscribe((response: any) => {
      this.StateCity = response[0].states;
    });
  }

  createDriverData() {
    this.driver_form = this.fb.group({
      driver_id:[Math.floor(1000000 + Math.random() * 900000)],
      driver_name: ['', Validators.required ],
      driver_phone: ['', Validators.required ],
      device_type: ['', Validators.required ],
      driver_address: ['', Validators.required ],
      driver_state: ['', Validators.required ],
      driver_city: ['', Validators.required ],
      driver_pincode: ['', Validators.required ]
   });
  }

  saveDriverData(value){
    if(this.driver_form.valid){
      this.driverservice.addDriver(value).subscribe((response: any) => {
        this.notifyService.showSuccess('Driver Added Succesfully','');
        this.allUsers = response.data;
        this.driver_form.reset();
        this.getStateCityData();
        this.createDriverData();
        this.modalService.dismissAll('close modal');
      });
    }else{
      this.notifyService.showError('Please enter all details of driver','')
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
