using makeb2b.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace makeb2b.Controllers
{
    [ApiController]
    [Route("api/grupos")]
    public class GrupoController : ControllerBase
    {

        private readonly GrupoRepository _repository;
               
        public GrupoController(GrupoRepository repository)
        {
            _repository = repository;
        }


        [HttpGet()]
        public async Task<ActionResult<string>> GetGrupos()
        {
            string dados = await _repository.GetGrupos();
            return dados;
        }

        [HttpGet("{grupo}")]
        public async Task<ActionResult<string>> GetGrupo(string grupo)
        {
            string dados = await _repository.GetGrupo( grupo );
            return dados;
        }

        [HttpGet("subgrupo/{grupo}")]
        public async Task<ActionResult<string>> GetGrupoSubGrupo(string grupo)
        {
            string dados = await _repository.GetGrupoSubGrupo(grupo);
            return dados;
        }


    }
}
