using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Makemoney.Domain.Api.Controllers

{
    // Endpoid => URL

    [Route("api/makemoney/home")]
    [ApiController]
    public class HomeController : ControllerBase
    {


        private class DadosMakemoney
        {
            public string Empresa { get; set; }
            public string Endereco { get; set; }
            public string Bairro { get; set; }
            public string Cidade { get; set; }
            public string Versao { get; set; }
            public string Data { get; set; }
            public string Hora { get; set; }

        }
                      

        [HttpGet]
         public async Task<ActionResult<IEnumerable<string>>> Get()
        {

            int dia = DateTime.Now.Day;
            int mes = DateTime.Now.Month;
            int ano = DateTime.Now.Year;

            int hours = DateTime.Now.Hour;
            int minutes = DateTime.Now.Minute;
            int seconds = DateTime.Now.Second;
          
            
            DadosMakemoney dadosMakemoney = new DadosMakemoney();
            dadosMakemoney.Empresa = "Avisnet System Informatica Ltda";
            dadosMakemoney.Endereco = "Rua Marechal Floriano, 654, sl: 612, 610 e 605";
            dadosMakemoney.Bairro = "Centro";
            dadosMakemoney.Cidade = "Governador Valadares - MG";
            dadosMakemoney.Versao = "1.0.0";
            dadosMakemoney.Data = dia.ToString() + "/" + mes.ToString() + "/" + ano.ToString();
            dadosMakemoney.Hora = hours.ToString() + ":" + minutes.ToString() + ":" + seconds.ToString();

            return  Ok(dadosMakemoney);
        }


    }

    
    //https://app.balta.io/player/7194/modules/1/classes/12/13/14
}
