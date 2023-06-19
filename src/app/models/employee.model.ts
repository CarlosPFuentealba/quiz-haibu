export class EmployeeModel {
    id?: string;
    rut?: string;
    nombre?: string;
    apellido?: string;
    telefono?: number;
    fechaNacimiento?: number;
    direccion?: DireccionModel;
    activo?: number;
    observacion?: string;

    constructor(e) {
        this.id = e.id || '';
        this.rut = e.rut || '';
        this.nombre = e.nombre || '';
        this.apellido = e.apellido || '';
        this.telefono = e.telefono || '';
        this.fechaNacimiento = e.fechaNacimiento || '';
        this.direccion = new DireccionModel({});
        this.activo = e.activo || 1; 
        this.observacion = e.observacion || '';
    }
}


export class DireccionModel {
    calle?: string;
    numero?: number;
    comuna?: string;

    constructor(d) {
        this.calle = d.calle || '';
        this.numero = d.numero || '';
        this.comuna = d.comuna || '';
    }
}