import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// const baseUrl = 'https://gosarthii-api.herokuapp.com';
const baseUrl = 'http://localhost:80';
const addDriver = '/addDriver/';
const getAllDriver = '/getAllDriver/';
const getSingleDriver = '/getSingleDriver';
const addDriverDocs = '/addDriverDocs/';
const getDriverDocs = '/getDriverDocs/';
const updateDriverStatus = '/updateDriverStatus/';
const getAllStatus = '/getAllStatus/';
const addDriverHistory = '/addDriverHistory/';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  addDriver(data) {
    return this.http.post(baseUrl + addDriver, data);
  }

  addDriverDocs(data) {
    let headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    let options = { headers: headers };
    return this.http.post(baseUrl + addDriverDocs, data);
  }

  getAllDriver(driver_status) {
    return this.http.get(baseUrl + getAllDriver + "?driver_status=" + driver_status);
  }

  getSingleDriver(driver_id) {
    return this.http.get(baseUrl + getSingleDriver + "?driver_id=" + driver_id);
  }

  getDriverDocs(driver_id) {
    return this.http.get(baseUrl + getDriverDocs + "?driver_id=" + driver_id);
  }

  updateDriverStatus(data){
    return this.http.post(baseUrl + updateDriverStatus, data);
  }

  getAllStatus(status_type_id){
    return this.http.get(baseUrl + getAllStatus + "?status_type_id=" + status_type_id);
  }

  addDriverHistory(formdata){
    return this.http.post(baseUrl + addDriverHistory, formdata);
  }
}
