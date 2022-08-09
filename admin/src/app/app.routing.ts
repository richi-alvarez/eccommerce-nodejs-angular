import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";;

const appRoute: Routes = [
//rutas de nuestro poryecto en angular
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path:'inicio', component: InicioComponent }
]

export const appRoutingPorviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);