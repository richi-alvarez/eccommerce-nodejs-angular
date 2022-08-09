import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

const appRoute: Routes = [
//rutas de nuestro poryecto en angular
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path:'inicio', component: InicioComponent },
    {path:'login', component: LoginComponent }
]

export const appRoutingPorviders : any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);