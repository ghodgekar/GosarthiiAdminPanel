import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackBtnService } from '@services/back-btn.service';
import { DriverService } from '@services/driver.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {

  showDetails:boolean=false;
  details:boolean=true;
  image:boolean=true;
  closeResult: string = '';
  singleData: any=[];
  driver_id: string;
  ActivationData: any = [];
  DeactivationData:any = [];
  driver_deactive_form:FormGroup;
  driver_active_form:FormGroup;
  ActiveStatus:boolean=false;
  DeactiveStatus:boolean=false;
  constructor(private modalService: NgbModal,private router: Router,private driverservice: DriverService,private Actrouter: ActivatedRoute, public backBtn:BackBtnService, public fb:FormBuilder,private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.getActivationReason();
    this.getDeactivationReason();
    this.Actrouter.params.subscribe(paramsId => {
        this.driver_id = paramsId.driver_id;
    });
    this.driverservice.getSingleDriver(this.driver_id).subscribe((response: any) => {
      this.singleData = response;
    });
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

  getDriverDetails():void{
    this.router.navigate(['/dashboard']);
  }

  getDriverDocs():void{
    this.router.navigate(['/self-enrolled-driver-details']);
  }

  getActivationReason(){
    this.createDriverDeactivate();
    this.driverservice.getAllStatus(2).subscribe(response => {
      this.ActivationData = response;
    })
  }

  getDeactivationReason(){
    this.createDriverActivate();
    this.driverservice.getAllStatus(3).subscribe(response => {
      this.DeactivationData = response;
    })
  }

  createDriverDeactivate() {
    this.driver_deactive_form = this.fb.group({
      driver_id: ['', Validators.required ],
      status_type_id: ['3', Validators.required ],
      remark: ['', Validators.required ],
      status_name: ['', Validators.required ]
   });
  }

  createDriverActivate() {
    this.driver_active_form = this.fb.group({
      driver_id: ['', Validators.required ],
      status_type_id: ['2', Validators.required ],
      remark: ['', Validators.required ],
      status_name: ['', Validators.required ]
   });
  }

  saveDeactiveDriver(value){
    this.driverservice.updateDriverStatus({driver_id:this.driver_id, driver_status:3}).subscribe(key => {
    })
    this.driverservice.addDriverHistory(value).subscribe(response => {
      this.driver_deactive_form.reset();
      this.notifyService.showSuccess("Driver Deactivated Successfully","");
      this.modalService.dismissAll('close modal');
    })
  }

  saveActiveDriver(value){
    this.driverservice.updateDriverStatus({driver_id:this.driver_id, driver_status:4}).subscribe(key => {
    })
    this.driverservice.addDriverHistory(value).subscribe(response => {
      this.driver_active_form.reset();
      this.notifyService.showSuccess("Driver Activated Successfully","");
      this.modalService.dismissAll('close modal');
    })
  }

}
