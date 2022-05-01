import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import   swal from 'sweetalert2';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})
  constructor( private http: HttpClient, private router: Router) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      tap(response =>{
        let clientes = response as Cliente[];
        clientes.forEach( cliente => {
          console.log('%cClienteService Método tap 1', 'background: #FF7133; color: #FDFEFE');
          console.log(cliente.nombre);
        })
      }),
      map( (response) => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre   = cliente.nombre.toLocaleUpperCase();
          let datePipe = new DatePipe('es-MX');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy')   //formatDate(cliente.createAt, 'EEEE dd, MMMM yyyy', 'en-US');
          return cliente;
        });
      }),
      tap(response =>{
        response.forEach( cliente => {
          console.log('%cClienteService Método tap 2', 'background: #148F77; color: #FDFEFE');
          console.log(cliente.nombre);
        })
      })
    );
    // return this.http.get<Cliente[]>(this.urlEndPoint)
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError( err => {

        if (err.status == 400) {
          return throwError( () => err );
        }
        console.error(err.error.Mensaje);
        swal.fire(err.error.Mensaje, err.error.Error, 'error');
        return throwError( () => err );
      })
    );
  }

  getCliente(id:any) : Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError( err => {
        this.router.navigate(['/clientes']);
        console.error(err.error.Mensanje);
        swal.fire('Error al editar', err.error.Mensanje, 'error');
        return throwError( () => err);
      })
    );
  }

  update(cliente: Cliente) : Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError( err => {

        if (err.status == 400) {
          return throwError( () => err );
        }
        console.error(err.error.Mensanje);
        swal.fire(err.error.Mensaje, err.error.Error, 'error');
        return throwError( () => err );
      })
    );
  }

  delete(id: number) : Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError( err => {
        console.error(err.error.Mensanje);
        swal.fire(err.error.Mensaje, err.error.Error, 'error');
        return throwError( () => err);
      })
    );
  }
}
