using makeb2b.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace makeb2b.Controllers
{
    [ApiController]
    [Route("api/boletos")]
    public class BoletoController : ControllerBase
    {

        private readonly BoletoRepository _repository;


        public BoletoController(BoletoRepository repository)
        {
            _repository = repository;
        }


        [HttpGet("email/{codemp}/{id}")]
        public async Task<ActionResult<string>> DoEmailBoleto(string codemp, int id)
        {
            string dados = await _repository.DoEmailBoleto( codemp, id );
            return dados;
        }
        
    }
}
