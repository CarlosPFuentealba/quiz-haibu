import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { EmployeeModel } from 'app/models/employee.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { EmployeeService } from 'app/modules/services/employee.service';
import moment from 'moment';
import _ from 'lodash';


@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent {
    
    employees: EmployeeModel[];
    employeesTemp: EmployeeModel[];
    @ViewChild('table', { static: true }) table: DatatableComponent;
    collapsed: boolean;
    search;

    constructor(private dialog: MatDialog,
                private employeeService: EmployeeService){
        this.collapsed = false;
        this.employeeService.getData().subscribe((data: any) => {
            this.employeesTemp = data;
            this.employees = data.map(d => {
                d.observacion = '';
                const fechaValida = moment(d.fechaNacimiento, 'DD/MM/YYYY', true).isValid();
                const rutValido = this.validaRut(d.rut);
                d.observacion = (fechaValida) ? d.observacion : 'Fecha Invalida';
                d.observacion = (rutValido) ? d.observacion : `${d.observacion} Rut invalido`;
                return d;
            });
        });
    }

    ngOnInit() {
    }

    collapse(): void {
        this.collapsed = !this.collapsed;
    }
    
    onActivate(event) {
        (event.type == 'click') && event.cellElement.blur();
        if (event.type == 'click') {
            const dialogRef = this.dialog.open(EmployeeDetailComponent, {
                disableClose: true,
                width: '500px',
                panelClass: 'users-form-dialog',
                data: { employee: event.row }
            });
        }
    }

    filterDatatable(event): any {
        let val = event.toLowerCase();
        let keys = ['nombre'];
        let colsAmt = keys.length;
        this.employees = this.employeesTemp.filter((item) => {
            for (let i = 0; i < colsAmt; i++) {
                if (this.removeAccent(item[keys[i]]).toLowerCase().indexOf(val) !== -1 || !val) {
                    return true;
                }
            }
        });
        this.table.offset = 0;
    }

    closeFilter(): void {
        this.employees = this.employees;
        this.search = '';
    }

    removeAccent(str) {
        var map = {
            'a': 'á|à|ã|â|À|Á|Ã|Â',
            'e': 'é|è|ê|É|È|Ê',
            'i': 'í|ì|î|Í|Ì|Î',
            'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            'c': 'ç|Ç',
        };
        for (var pattern in map) {
            str = str.replace(new RegExp(map[pattern], 'g'), pattern);
        };
        return str;
    };

    validaRut(rut) {
        if (rut == null) {
            return false;
        } else {
            rut = this.limpiarRut(rut);
            rut = rut.trim();
            var position = (rut.length) - 1;
            var ouputRut = [rut.slice(0, position), '-', rut.slice(position)].join('');
            var Fn = {
                // Valida el rut con su cadena completa "XXXXXXXX-X"
                validaRut: function (rutCompleto) {
                    rutCompleto = rutCompleto.replace("‐", "-");
                    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                        return false;
                    var tmp = rutCompleto.split('-');
                    var digv = tmp[1];
                    var rut = tmp[0];
                    if (digv == 'K') digv = 'k';
                    return (Fn.dv(rut) == digv);
                },
                dv: function (T) {
                    var M = 0, S = 1;
                    for (; T; T = Math.floor(T / 10))
                        S = (S + T % 10 * (9 - M++ % 6)) % 11;
                    return S ? S - 1 : 'k';
                }
            }
            const validation = Fn.validaRut(ouputRut);
            return validation;
        }
    }
    limpiarRut(rut): string {
        if (rut == null) {
            return;
        } else {
            rut = rut.replace(/\./g, '')
            rut = rut.replace(/\-/g, '')
            rut = rut.trim();
            rut = rut.toLowerCase();
            return rut;
        }
    }

}

