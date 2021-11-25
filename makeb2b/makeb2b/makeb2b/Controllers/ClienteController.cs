using makeb2b.DTO;
using makeb2b.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace makeb2b.Controllers
{
    [ApiController]
    [Route("api/clientes")]
    public class ClienteController : ControllerBase
    {

        private readonly ClienteRepository _repository;

        
        public ClienteController(ClienteRepository repository)
        {
            _repository = repository;
        }
       
        [HttpGet]
        public async Task<ActionResult<string>> GetClientes([FromQuery(Name = "page")] int page)
        {
            string dados = await _repository.GetClientes(page);
            return dados;
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult<string>> GetCliente(string codigo)
        {
            string dados = await _repository.GetCliente(codigo);
            return dados;
        }

        [HttpGet("cnpj/{cnpj}")]
        public async Task<ActionResult<string>> GetClienteCNPJ(string cnpj)
        {
            string dados = await _repository.GetClienteCNPJ(cnpj);
            return dados;
        }

        [HttpGet("cnpj/senha/{cnpj}")]
        public async Task<ActionResult<string>> GetClienteCNPJSenha(string cnpj)
        {
            string dados = await _repository.GetClienteCNPJSenha(cnpj);
            return dados;
        }

        [HttpGet("titulos/{codigo}")]
        public async Task<ActionResult<string>> GetClienteTitulos(string codigo)
        {
            string dados = await _repository.GetClienteTitulos( codigo );
            return dados;
        }

        ///<summary>
        ///   Login do cliente.
        ///</summary>
        ///
        /// <remarks>
        ///   Exemplo:
        ///      {
        ///        "psw" : "sua senha aqui"
        ///      }
        /// </remarks>
        [HttpPost("login/{cnpj}")]
        public async Task<ActionResult<string>> GetClienteLogin(string cnpj, [FromBody] LoginDTO obj)
        {
            string dados = await _repository.GetClienteLogin(cnpj, obj);
            return dados;
        }

        [HttpPost("alterarsenha/{cnpj}")]
        public async Task<ActionResult<string>> DoAlterarSenha(string cnpj, [FromBody] AlterarSenhaDTO obj)
        {
            string dados = await _repository.DoAlterarSenha(cnpj, obj );
            return dados;
        }

        [HttpPost("{codigo}")]
        public async Task<ActionResult<string>> DoCliente(string codigo, [FromBody] ClienteUpdateDTO obj)
        {
            string dados = await _repository.DoCliente(codigo, obj);
            return dados;
        }


    }
}
