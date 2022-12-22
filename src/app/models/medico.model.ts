import { Hospital } from './hospital.model';

interface _MedicoUser {
    _id: string;
    nombre: string;
    img: string;
}

export interface MedicosInterface {
    ok: boolean,
    medicos: Medico[];
}

export interface MedicoInterface {
    ok: boolean,
    medico: Medico;
}

export class Medico {
    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _MedicoUser,
        public hospital?: Hospital
    ) { }
}