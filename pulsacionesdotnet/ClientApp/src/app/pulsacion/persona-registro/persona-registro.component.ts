import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css']
})
export class PersonaRegistroComponent implements OnInit {
  persona: Persona;
  mensaje: string;
  durations = [{ title: "Femenino", value: "femenino" },
  { title: "Masculino", value: "masculino" }];
  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.persona = new Persona;
  }

  calcularPulsacion() {
    if (this.persona.sexo == "m") {
      var pulsaciones = (210 - this.persona.edad) / 10;
      this.persona.pulsacion = pulsaciones;
    } else {
      var pulsaciones = (220 - this.persona.edad) / 10;
      this.persona.pulsacion = pulsaciones;
    }
  }


  add() {
    this.calcularPulsacion();
    this.personaService.post(this.persona).subscribe(p => {
      if (p != null) {
        this.mensaje = "Se guardaron los datos corretamente de: " + p.nombre;
      }
    });
  }
}
