import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Persona } from '../Pulsacion/models/persona';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  baseURL:string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string){ 
    this.baseURL=baseUrl;

  }
  get():Observable<Persona[]>{
    return this.http.get<Persona[]>(this.baseURL+'api\persona').pipe(
      tap(),
      catchError(error=>{
        console.log('se ha presentado un error al registrar los datos')
        return of(error as Persona[])
      })
    );
    
  }

  post(persona:Persona):Observable<Persona>{    
    return this.http.post<Persona>(this.baseURL+'api\persona',persona).pipe(
      tap(_=>console.log("Los datos se guardaron Stisfactoriamente")),
      catchError(error=>{
        console.log('se ha presentado un error al registrar los datos')
        return of(persona)
      })
    )
  }

  getHombres():Observable<Persona[]>{
    let personas:Persona[]=[];
    personas=JSON.parse(localStorage.getItem('datos'));
      for (const persona of personas){
        if (persona.sexo == "masculino") {
          return of(personas).pipe(
            catchError(error=>{
              console.log('error al consultar');
              return of(personas);
            })
          )
        }
      }
  }
   
}
