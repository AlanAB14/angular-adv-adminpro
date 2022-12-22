interface _HospitalUser {
    nombre: string;
    _id: string;
    img: string;
}

export class Hospital {

    constructor (
        public nombre   : string,
        public _id?     : string,
        public usuario? : _HospitalUser,
        public img?     : string,
    ) { }

}

export interface HospitalInterface {
    ok: boolean,
    hospitales: Hospitales[];
    uid: string;
}

export interface Hospitales {
    _id: string,
    nombre: string,
    usuario: _HospitalUser
}