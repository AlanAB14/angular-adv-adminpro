import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy{

  public medicos!: Medico[];
  public medicosTemp!: Medico[];
  public cargandoData = true;
  private imgSubs!: Subscription;

  constructor( private medicosService: MedicoService,
               private busquedaService: BusquedasService,
               private modalImagenService : ModalImagenService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }
  
  ngOnInit(): void {
    this.cargarMedicos()

    this.imgSubs = this.modalImagenService.nuevaImagenSubida
    .pipe(
      delay(100)
    )
    .subscribe( img => {
      this.cargarMedicos() 
    });
  }

  cargarMedicos() {
    this.cargandoData = true;
    this.medicosService.cargarMedicos()
      .subscribe( medicos => {
        this.medicos = medicos;
        this.medicosTemp = medicos;
        this.cargandoData = false;
      })
  }


  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      this.medicos = this.medicosTemp
      return;
    }

    this.busquedaService.buscar('medicos', termino)
      .subscribe( resp => {
        this.medicos = resp as Medico[];
      })
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  borrarMedico( medico: Medico ) {
    Swal.fire({
      title: '¿Borrar medico?',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.borrarMedicos( medico._id! )
          .subscribe( resp => {

            this.cargarMedicos();
            Swal.fire(
              'Medico borrado',
              `${ medico.nombre } fue eliminado correctamente`,
              'success'
            )

          })
      }
    })
  }
}
