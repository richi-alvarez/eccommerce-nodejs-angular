import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes:Array<any>=[];
  public filtro_apellidos = '';
  public flitro_correo = '';

  public page = 1;
  public pageSize = 1;
  public token;
  constructor(
    private _clienteService : ClienteService,
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();
   }

  ngOnInit(): void {
    this.init_Data();
  }

  init_Data(){
    this._clienteService.listar_clientes_filtro_admin(null,null,this.token).subscribe(
      respose=>{
        this.clientes = respose.data;
        console.log(this.clientes)
      },
      error=>{
        console.log(error)
      }
    );
  }

  filtro(tipo: string){
    if(tipo=="apellidos"){
      if(this.filtro_apellidos){
        this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_apellidos,this.token).subscribe(
          respose=>{
            this.clientes = respose.data;
            console.log(this.clientes)
          },
          error=>{
            console.log(error)
          }
        );
      }else{
        this.init_Data();
      }
    }else if(tipo=="email"){
      if(this.flitro_correo){
        this._clienteService.listar_clientes_filtro_admin(tipo,this.flitro_correo,this.token).subscribe(
          respose=>{
            this.clientes = respose.data;
            console.log(this.clientes)
          },
          error=>{
            console.log(error)
          }
        );
      }else{
        this.init_Data();
      }
    }
  }

}
