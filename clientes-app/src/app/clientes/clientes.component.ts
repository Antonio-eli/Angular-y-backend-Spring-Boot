import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import   Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  constructor(private ClienteService: ClienteService) { }

  ngOnInit(): void {
      this.ClienteService.getClientes().pipe(
        tap( clientes => {
          this.clientes = clientes
          clientes.forEach( cliente => {
            console.log('%cClientesComponent Método tap 3', 'background: #7FB3D5; color: #FDFEFE');
            console.log(cliente.nombre);
          })
        })
      ).subscribe();
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-outline-success mx-3',
        cancelButton: 'btn btn-outline-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro de eliminar a?',
      text: `${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.ClienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(clienteEliminado => clienteEliminado !== cliente )
            swalWithBootstrapButtons.fire(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado exitosamente.`,
              'success'
            )
          }
        )
      }
    })
  }

}
