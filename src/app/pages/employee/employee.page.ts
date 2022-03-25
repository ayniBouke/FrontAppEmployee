import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Employee } from 'src/app/models/Employee';
import { ServiceEmployeeService } from 'src/app/services/servicesEmployees/service-employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  employees : Employee[] = []
  DataLoaded = false;
  myInput ; 
  imUser = "../../assets/images/userIm.png";

  constructor(
    private serviceEmployee : ServiceEmployeeService,
    private router : Router,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {
    // let empl = JSON.parse(localStorage.getItem('employeesStorage'));
    // this.serviceEmployee.employees = empl;
    this.serviceEmployee.getAllEmployee().subscribe(
      (employees : Employee[]) => {
        //this.serviceEmployee.employees = employees;
        let empl = JSON.parse(localStorage.getItem('employeesStorage'));
        this.serviceEmployee.employees = empl;
        this.DataLoaded = true;
        console.log("Employees : ", employees);
         
      },
      err => {
        console.log("Error : ", err)
      }
    )
  }
  onCancel(){
    console.log("onCancel ^^^^^^^^^^^^^^ ");
    //this.myInput = ' ';
    
    //this.myData = this.service.allData;
    this.serviceEmployee.getAllEmployee().subscribe(
      data => {
        //this.service.AddData = data as any;
        console.log("Cancel " , data);
        this.router.navigate(['/employee/']);
      }
    );
  }
  onInput($event){
    // Reset items back to all of the items
    var val = $event.target.value;
    this.myInput = val;
    console.log('input ', val);
    console.log('input item ',  val.trim());
    this.serviceEmployee.geTitle(this.myInput);
  }

  NewEmployee(){
    console.log("New Employee");
    this.router.navigate(['/insert-employee/-1'])
  }
  UpdateEmployee(id){
    console.log("Update Employee ", id);
    this.router.navigate(['/insert-employee/' + id])
  }
  DeleteEmployee(id){ 

    this.alertCtrl.create({
      header: 'Alert Delete',
      //subHeader: 'Subtitle for alert',
      message: 'You are sur delete Employee have Id : '+ id +'?',
      buttons: [
        {
          text: 'Not Sure',
          handler: () => {
            this.router.navigate(["/employee/"]);
          }
        },
        {
          text: 'Yes!',
          handler: () => {
            this.serviceEmployee.deleteEmployee(id).subscribe(
              data => {
                console.log("Employee Deleted ", id);
                this.serviceEmployee.getAllEmployee();
              },
              err => {
                console.log("Error Delete Employee ", err);
              }
            );
        
          }
        }
      ]
    }).then(res => {

      res.present();

    });
  }

  locale(){
    this.router.navigate(["/localstorage/"]);
  }
}
