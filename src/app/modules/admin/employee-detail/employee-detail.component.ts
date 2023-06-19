import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeModel } from 'app/models/employee.model';

interface EmployeeDataDialog {
  employee: EmployeeModel
}

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employeeForm: FormGroup;
  employee: EmployeeModel;

  constructor(public dialogRef: MatDialogRef<EmployeeDetailComponent>,
             @Inject(MAT_DIALOG_DATA) public data: EmployeeDataDialog,
             private formBuilder: FormBuilder) {
        if (this.data.employee) {
            this.employee = this.data.employee;
        } else {
          this.employee = new EmployeeModel({})
        }
        this.employeeForm = this.createEmployeeForm();
  }

  createEmployeeForm() {
    return this.formBuilder.group({
        nombre: [this.employee.nombre],
        apellido: [this.employee.apellido],
        rut: [this.employee.rut],
        telefono: [this.employee.telefono],
        fechaNacimiento: [this.employee.fechaNacimiento],
        comuna: [this.employee.direccion.calle],
        calle: [this.employee.direccion.calle],
        numero: [this.employee.direccion.numero],
    });
  }

  ngOnInit(): void {
  }

}
