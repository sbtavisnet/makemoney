using makeb2b.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace makeb2b.Controllers
{
    [ApiController]
    [Route("api/clientes")]
    public class EmailController : ControllerBase
    {

        private readonly EmailRepository _repository;


        public EmailController(EmailRepository repository)
        {
            _repository = repository;
        }


        [HttpGet("recuperarsenha/{cnpj}")]
        public async Task<ActionResult<string>> GetRecuperarSenha(string cnpj)
        {
            string dados = await _repository.GetRecuperarSenha( cnpj );
            return dados;
        }
        
    }
}
