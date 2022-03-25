import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { ServiceEmployeeService } from 'src/app/services/servicesEmployees/service-employee.service';

@Component({
  selector: 'app-insert-employee',
  templateUrl: './insert-employee.page.html',
  styleUrls: ['./insert-employee.page.scss'],
})
export class InsertEmployeePage implements OnInit {

  id ;
  btn_txt : string = "";
  employee : Employee = new Employee();

  constructor(
    private route: ActivatedRoute,
    private serviceEmployee : ServiceEmployeeService,
    private router : Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      par => this.id = par.id
    );
    console.log("Id : ", this.id);

    if (this.id != -1) {
      this.btn_txt = "Update Employee";
      this.serviceEmployee.getEmployee(this.id).subscribe(
        data => {
          this.employee = data;
          console.log("Employee ", data);
        }
      );
      console.log("Yes");
    }
    else {
      this.btn_txt = "Add Employee";
      console.log("Non");

    }
  }

  register(){
    console.log(this.employee);
    if(this.id != -1){
      this.employee.ID = this.id;
      this.employee.modificationDate = new Date();
      this.serviceEmployee.addEmployee(this.employee).subscribe(
        data => {console.log("Employee Updated");
        this.serviceEmployee.getAllEmployee(); //update data locale
        this.router.navigate(['/employee/']);
      },
        err => console.log("Employee update err ", err)
      );
    }else{
      //this.employee.ID = null;
      this.employee.creationDate = new Date();
      this.employee.modificationDate = new Date();
      this.serviceEmployee.addEmployee(this.employee).subscribe(
        data => {console.log("Employee Added");
        this.serviceEmployee.getAllEmployee(); //update data locale
        this.router.navigate(['/employee/']);
      },
        err => console.log("Employee add err ", err)
      )
    }
  }
}
