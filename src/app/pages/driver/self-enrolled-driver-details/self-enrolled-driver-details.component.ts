import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BackBtnService } from '@services/back-btn.service';
import { DriverService } from '@services/driver.service';


@Component({
  selector: 'app-self-enrolled-driver-details',
  templateUrl: './self-enrolled-driver-details.component.html',
  styleUrls: ['./self-enrolled-driver-details.component.scss']
})
export class SelfEnrolledDriverDetailsComponent implements OnInit {
  showDetails:boolean=false;
  details:boolean=true;
  image:boolean=true;
  closeResult: string = '';
  driver_id: any;
  allUsers: any;
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  document_title:string;
  showUploadDocDiv: boolean;
  allDriverDocs: any=[];
  allRejectStatus: any=[];

  driverDocumentList:any=[{ doc_id: "1", doc_name:"Profile Image", isBoolean:false},
  { doc_id: "2", doc_name:"Aadhar Card Front Page", isBoolean:false},
  { doc_id: "3", doc_name:"Aadhar Card Back Page", isBoolean:false},
  { doc_id: "4", doc_name:"Pancard Image", isBoolean:false},
  { doc_id: "5", doc_name:"Driver Licence Image", isBoolean:false},
  { doc_id: "6", doc_name:"Police Verification Image", isBoolean:false}]

  constructor(private modalService: NgbModal,private router: Router, public backBtn:BackBtnService, private Actrouter:ActivatedRoute, private driverservice:DriverService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      image: [''],
      driver_id: [''],
      doc_id: [''],
    });
    this.Actrouter.params.subscribe(paramsId => {
        this.driver_id = paramsId.driver_id;
    });
    this.users();
    this.getRejectReason();
  }

  public getRejectReason(){
    this.driverservice.getAllStatus(4).subscribe((response: any) => {
      this.allRejectStatus = response;
    })
  }

  private users():void{
    this.driverservice.getSingleDriver(this.driver_id).subscribe((response: any) => {
      this.allUsers = response;
    })
  }

  public getDriverDocs():void{
    this.driverservice.getDriverDocs(this.driver_id).subscribe((response: any) => {
      this.allDriverDocs = response;
      this.driverDocumentList.forEach(function (key1) {
        response.forEach(function (key2) {
          if (key1.doc_id == key2.driver_doc_id) {
            key1.isBoolean == true;
            console.log(key1)
          }
        });
      });
    })
  }
  
  open(content:any) {
    this.getDriverDocs();
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

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('image').setValue(file);
  }

  onFormSubmit() {
    if (!this.fileUploadForm.get('image').value) {
      alert('Please fill valid details!');
      return false;
    }
    const formData = new FormData();
    formData.append('image', this.fileUploadForm.get('image').value);
    formData.append('driver_id', this.driver_id);
    formData.append('doc_id', this.fileUploadForm.get('doc_id').value);
    this.driverservice.addDriverDocs(formData).subscribe((response: any) => {
      console.log(response)
      if(response){
        this.fileInputLabel = '';
        this.fileUploadForm.reset();
      }
    })
  }

  updateStatus(status_id){
    this.driverservice.updateDriverStatus({'driver_status':status_id, 'driver_id':this.driver_id}).subscribe(response => {
      console.log(response)
    })
  }

  uploadPanelDisplay(id):void{
    this.showUploadDocDiv=true;
    this.document_title=this.driverDocumentList[id].doc_name;
    this.fileUploadForm.get('doc_id').setValue(this.driverDocumentList[id].doc_id);
  }

  docBack():void{
    this.showUploadDocDiv=false;
  }


}
