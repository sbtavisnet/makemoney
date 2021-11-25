using makeb2b.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace makeb2b.Controllers
{
    [ApiController]
    [Route("api/pedidos")]
    public class VendaController : ControllerBase
    {

        private readonly VendaRepository _repository;

        
        public VendaController(VendaRepository repository)
        {
            _repository = repository;
        }
       

        [HttpGet("{codigo}")]
        public async Task<ActionResult<string>> GetUltimosPedidos(string codigo)
        {
            string dados = await _repository.GetVendaUltimosPedidos(codigo);
            return dados;
        }

        [HttpGet("itens/{id}")]
        public async Task<ActionResult<string>> GetPedidosItens(int id)
        {
            string dados = await _repository.GetPedidoItens( id );
            return dados;
        }




    }
}
