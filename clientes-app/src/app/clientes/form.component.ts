import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import   swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente()
  private titulo: string = "Crear cliente"

  public errores: string[];

  constructor(  private ClienteService: ClienteService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.ClienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }

  public create():void {
    //console.log("entrando al método create()....");
    this.ClienteService.create(this.cliente).subscribe(
      Cliente => {
        this.router.navigate(['/clientes'])
        swal.fire(
          'Nuevo cliente',
          `Cliente ${Cliente.nombre} creado con exito!`,
          'success'
        )
      },
      err => {
        this.errores = err.error.errors as string[];
        console.log('Codigo del error desde el backend: ' + err.status)
        console.error(err.error.errors);
      }
    );
  }


  public update():void {
    console.log("entrando al método create()....");
    this.ClienteService.update(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        swal.fire(
          'Cliente',
          `Cliente ${response.Cliente.nombre} actualizado con exito!`,
          'success'
        )
      },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Codigo del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
    )
  }
}
