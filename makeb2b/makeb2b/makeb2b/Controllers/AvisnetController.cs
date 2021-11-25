using makeb2b.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace makeb2b.Controllers
{
    [ApiController]
    [Route("api")]
    public class AvisnetController : ControllerBase
    {

        private readonly AvisnetRepository _repository;
        public AvisnetController(AvisnetRepository repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// Dados da empresa.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<string>> Avisnet()
        {
            string dados = await _repository.GetAvisnet();
            return dados;
        }
        
    }
}
