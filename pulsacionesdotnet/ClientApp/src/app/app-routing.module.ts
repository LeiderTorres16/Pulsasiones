import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PersonaConsultaComponent } from './Pulsacion/persona-consulta/persona-consulta.component';
import { PersonaRegistroComponent } from './Pulsacion/persona-registro/persona-registro.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path:'registro', component:PersonaRegistroComponent},
      {path:'consulta', component:PersonaConsultaComponent}
     
])
  ],
  exports:[RouterModule] 
})
export class AppRoutingModule { }
