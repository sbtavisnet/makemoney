using makeb2b.DTO;
using makeb2b.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace makeb2b.Controllers
{
    [ApiController]
    [Route("api/pedidos")]
    public class EcommerceController : ControllerBase
    {

        private readonly EcommerceRepository _repository;
        public EcommerceController(EcommerceRepository repository)
        {
            _repository = repository;
        }

       
        [HttpPost()]
        public async Task<ActionResult<string>> DoPedido( [FromBody] PedidoDTO obj  )
        {
            string dados = await _repository.DoPedido( obj );
            return dados;
        }
        
    }
}
