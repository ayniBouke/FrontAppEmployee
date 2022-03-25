import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
  
import { config } from '../../app.module';
import { Employee } from 'src/app/models/Employee';

@Injectable({
  providedIn: 'root'
})
export class ServiceEmployeeService {

  employees : Employee[];
  haveData : boolean = false;
  getApiUrl : string = "http://192.168.1.230:1005/api/employee/"; //"https://jsonplaceholder.typicode.com/posts"; 
  constructor(private http : HttpClient) { }
  headers = new Headers(
    {
      "Authorization" : "Bearer " + localStorage.getItem("token"),
      "Content-Type" : "application/json"
    }
  );
  //a = localStorage.getItem("token");
  //headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
  //headers.append("Content-Type", "application/json");

  localalStorage(employees){
    localStorage.setItem('employeesStorage',JSON.stringify(employees));
    let empl = JSON.parse(localStorage.getItem('employeesStorage'));
    console.log("storage employes ", empl );
  }
  getAllEmployee() {
    this.http.get<Employee[]>(this.getApiUrl).subscribe(
      data => {
        this.employees = data;
        localStorage.setItem('employeesStorage',JSON.stringify(data));
      }
    );
   return this.http.get<Employee[]>(this.getApiUrl);
  }
  geTitle(title : string) {
    var listData = [];
    this.haveData = false;
    //this.employees = this.http.get<any[]>(this.getApiUrl);
    this.http.get(this.getApiUrl).subscribe(
      data =>{
        var i = 0;
        console.log("Data service ", data);
        console.log("First Name data 0 ",data[0].FirstName);
        while(data){
          console.log("FirstName data 0 ",data[0].FirstName);
          var firstName = data[i].FirstName;
          console.log("FirstName ",firstName);
          if(firstName.search(title) != -1){
            this.haveData = true;
            listData.push(data[i]) ;
          }
          i = i + 1 ;
        }
      }
    );
    this.employees = []
    this.employees = listData;
  }
  getEmployee(id : number) {
    return this.http.get<Employee>(this.getApiUrl + id );
  }
  addEmployee(data : Employee){ 
    console.log("Data service object : ", data);
    return this.http.post<Employee>(this.getApiUrl, data, { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) });
  }

  deleteEmployee(id : number) {
    return this.http.delete<Employee>(this.getApiUrl + id );
  }
}
