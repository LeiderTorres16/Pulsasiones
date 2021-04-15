import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-persona-consulta',
  templateUrl: './persona-consulta.component.html',
  styleUrls: ['./persona-consulta.component.css']
})
export class PersonaConsultaComponent implements OnInit {
  personas: Persona[];
  public total = 0;
  cantidadHombres: number;
  cantidadMujeres: number;
  
  constructor(private personasService: PersonaService) { }

  ngOnInit(): void {
    this.getFiltroHombres();
  }
  
  calcularNumeroHombres(){
    this.cantidadHombres=0;
    for (const persona of this.personas) {
      if (persona.sexo == "masculino") {
        this.cantidadHombres= this.cantidadHombres + 1;
      }
    }
    return this.cantidadHombres;
  }

  calcularNumeroMujeres(){
    this.cantidadMujeres=0;
    for (const persona of this.personas) {
      if (persona.sexo == "femenino") {
        this.cantidadMujeres= this.cantidadMujeres + 1;
      }
    }
    return this.cantidadMujeres;
  }

  get() {
    
    this.personasService.get().subscribe(p =>{
      this.personas = p
      console.log('Ya se consultaron los datos');
      this.calcularNumeroHombres();
    this.calcularNumeroMujeres();
    })
  }

  getFiltroHombres() {
    this.personasService.getHombres().subscribe(p =>{
      this.personas = p
      console.log('Ya se consultaron los datos');
      this.calcularNumeroHombres();
    this.calcularNumeroMujeres();
    })
  }


}
