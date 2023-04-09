import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employees = [
    { name: 'John Doe', department: 'Sales', salary: '$50,000' },
    { name: 'Jane Smith', department: 'Marketing', salary: '$60,000' },
    { name: 'Bob Johnson', department: 'IT', salary: '$70,000' },
    { name: 'Alice Lee', department: 'HR', salary: '$80,000' },
  ];

  addEmployee() {
    this.employees.push({ name: '', department: '', salary: '' });
  }
}
