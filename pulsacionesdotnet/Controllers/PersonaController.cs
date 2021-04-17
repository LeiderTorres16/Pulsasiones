using System.Collections.Generic;
using System.Linq;
using Datos;
using Entidad;
using Logica;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using pulsacionesdotnet.Models;

namespace pulsacionesdotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class PersonaController : ControllerBase
    {
        private PersonaService personaService;
        public IConfiguration Configuration { get; }
        public PersonaController(PulsacionesContext context)
        {
            personaService = new PersonaService(context);
        }

        [HttpPost]
        public ActionResult<PersonaViewModel> PostPersona(PersonaInputModel personaInput)
        {
            var Persona = MapearPersona(personaInput);
            var response = personaService.Guardar(Persona);
            if (response.Error)
            {
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Persona);

        }

        [HttpGet]
        public IEnumerable<PersonaViewModel> Gets()
        {
            var personas = personaService.ConsultarTodos().Select(p => new PersonaViewModel(p));
            return personas;
        }

        [HttpGet("{identificacion}")]
        public ActionResult<PersonaViewModel> Get(string identificacion)
        {
            var persona = personaService.BuscarxIdentificacion(identificacion);
            if (persona == null) return NotFound();
            var personaViewModel = new PersonaViewModel(persona);
            return personaViewModel;
        }

        [HttpDelete("{identificacion}")]
        public ActionResult<string> Delete(string identificacion)
        {
            string mensaje = personaService.Eliminar(identificacion);
            return Ok(mensaje);
        }


        private Persona MapearPersona(PersonaInputModel personaInput)
        {
            var persona = new Persona
            {
                Identificacion = personaInput.Identificacion,
                Nombre = personaInput.Nombre,
                Edad = personaInput.Edad,
                Sexo = personaInput.Sexo
            };
            return persona;
        }

    }
}