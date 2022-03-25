import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-localstorage',
  templateUrl: './localstorage.page.html',
  styleUrls: ['./localstorage.page.scss'],
})
export class LocalstoragePage implements OnInit {

  //employees : Employee[] = []
  DataLoaded = false;
  myInput ; 
  employees: any = [];
  imUser = "../../assets/images/userIm.png";
  constructor(
    private router : Router
  ) { }

  ngOnInit() {
    let data = [ 
      {ID: 2, FirstName: "sdsd", LastName: "dsfs", CIN: "sdsd", Age: 25},
      {ID: 3, FirstName: "xcxw", LastName: "sdsd", CIN: "ss", Age: 35  },
      {ID: 6, FirstName: "dscs", LastName:"sdcsd", CIN: "sdcds", Age: 40  } 
    ];
    localStorage.setItem('employeesStorage',JSON.stringify(data));
    let empl = JSON.parse(localStorage.getItem('employeesStorage'));
    this.employees = empl;
  }

  back(){
    this.router.navigate(["/employee/"]);
  }
}
