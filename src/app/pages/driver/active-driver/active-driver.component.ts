import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverService } from '@services/driver.service';

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
  constructor(private http: HttpClient,private router: Router,private modalService: NgbModal,private fb: FormBuilder, private driverservice:DriverService) { }
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

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  users(): void {
    this.driverservice.getAllDriver("2").subscribe((response: any) => {
      this.allUsers = response;
      this.dtTrigger.next();
    })
  }

  getDriverDetails(driver_id):void{
    this.router.navigate(['/driver-details',driver_id]);
  }

  getStateCityData(){
    this.http.get('https://gosarthii-api.herokuapp.com/getAllCountriesStatesCities/').subscribe((response: any) => {
      console.log(response)
      this.StateCity = response[0].states;
    });
  }

  createDriverData() {
    this.driver_form = this.fb.group({
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
    this.driverservice.addDriver(value).subscribe((response: any) => {
      this.allUsers = response.data;
      this.dtTrigger.next();
    });
  }
}
