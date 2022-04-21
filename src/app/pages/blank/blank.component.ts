import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss']
})
export class BlankComponent {
    allUsers: any = [];
    dtTrigger: Subject<any> = new Subject<any>();
    dtOptions: DataTables.Settings = {};
    constructor(private http: HttpClient) { }
    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true
          };
        this.users();
    }
    
    users(): void {
        this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((response: any) => {
            this.allUsers = response;
            this.dtTrigger.next();
        });
    }
}
