import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital, HospitalInterface } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Hospitales } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy{

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];


  public cargando: boolean = true;
  public imgSubs!: Subscription;

  public termino: string = '';


  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busquedaService: BusquedasService ) { }
               
  ngOnDestroy(): void {

    this.imgSubs.unsubscribe();

  }
  
  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagenSubida
    .pipe(
      delay(100)
    )
    .subscribe( img => {
      this.cargarHospitales() 
    });
  }

  cargarHospitales() {

    this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {
        console.log(hospitales)
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;

      })

  }

  guardarCambios( hospital: Hospital ) {
    this.hospitalService.actualizarHospitales( hospital._id!, hospital.nombre )
      .subscribe( resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success')
      })
  }

  eliminarHospital( hospital: Hospital ) {
    this.hospitalService.borrarHospitales( hospital._id! )
      .subscribe( resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success')
      })
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    })
    
    if ( value!.trim().length > 0 ) {
      this.hospitalService.crearHospital( value! )
        .subscribe( (resp: any) => {
          this.hospitales.push( resp.hospital )
        })
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      this.hospitales = this.hospitalesTemp
      return;
    }

    this.busquedaService.buscar('hospitales', termino)
      .subscribe( resp => {
        this.hospitales = resp as Hospital[];
      })
  }


}
