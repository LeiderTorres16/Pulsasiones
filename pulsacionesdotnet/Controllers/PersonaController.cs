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
        public PersonaController(IConfiguration configuration)
        {
            Configuration = configuration;
            string connectionString = Configuration["ConnectionStrings:DefaultConnection"];
            personaService = new PersonaService(connectionString);
        }
        
        [HttpPost]
        public ActionResult<PersonaViewModel> PostPersona(PersonaInputModel personaInput)
        {
            var Persona = MapearPersona(personaInput);
            var response= personaService.Guardar(Persona);
            if(response.Error){
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Persona);

        }
    

        /*public ActionResult<IEnumerable<PersonaViewModel>> GetPersona()
        {
            var Persona = personaService.ConsultarTodos();
            var response= personaService.Guardar(Persona);
            if(response.Error){
                return BadRequest(response.Mensaje);
            }
            return Ok(response.Persona);

        }*/


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