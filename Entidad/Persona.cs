using System;

namespace Entidad
{
    public class Persona
    {
        public string Identificacion { get; set; }
        public string Nombre { get; set; }
        public int Edad { get; set; }
        public string Sexo { get; set; }
        public decimal Pulsacion { get; set; }
        public override string ToString()
        {
            return $"Identificacion: {Identificacion} - Nombre:{Nombre}-Edad:{Edad} -Sexo:{Sexo} -Pulsacion: {Pulsacion} ";
        }
        public void CalcularPulsacion()
        {
       
            if (Sexo.ToUpper().Equals("F"))
            {
                Pulsacion = (220 - Edad) / 10;
            }
            else if (Sexo.ToUpper().Equals("M"))
            {
                Pulsacion = (210 - Edad) / 10;
            }
            else
            {
                Pulsacion = 0;
            }
            
        }
    }
}
