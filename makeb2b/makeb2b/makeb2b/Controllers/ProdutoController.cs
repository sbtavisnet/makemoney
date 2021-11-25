using makeb2b.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace makeb2b.Controllers
{
    [ApiController]
    [Route("api/produtos")]
    public class ProdutoController : ControllerBase
    {

        private readonly ProdutoRepository _repository;

        
        public ProdutoController(ProdutoRepository repository)
        {
            _repository = repository;
        }
       

        [HttpGet("{codigo}")]
        public async Task<ActionResult<string>> GetProduto(string codigo)
        {
            string dados = await _repository.GetProduto(codigo);
            return dados;
        }



        [HttpGet("page/{page}")]
        public async Task<ActionResult<string>> GetProdutos(int page)
        {
            string dados = await _repository.GetProdutos( page );
            return dados;
        }

        [HttpGet("descricao/{despro}/{page}")]
        public async Task<ActionResult<string>> GetProdutosDescricao(string despro, int page)
        {
            string dados = await _repository.GetProdutosDescricao(despro, page);
            return dados;
        }

        [HttpGet("grupo/{grupo}/{page}")]
        public async Task<ActionResult<string>> GetProdutosGrupo(string grupo, int page)
        {
            string dados = await _repository.GetProdutosGrupo(grupo, page);
            return dados;
        }



        [HttpGet("grupo/subgrupo/{grupo}/{subgrupo}/{despro}/{page}")]
        public async Task<ActionResult<string>> GetProdutosSubGrupoDescricao(string grupo, 
                                                                    string subgrupo,
                                                                    string despro,
                                                                    int page)
        {
            string dados = await _repository.GetProdutosSubGrupoDescricao(grupo, subgrupo, despro , page);
            return dados;
        }



        [HttpGet("grupo/subgrupo/{grupo}/{subgrupo}/{page}")]
        public async Task<ActionResult<string>> GetProdutosSubGrupo(string grupo,
                                                            string subgrupo,
                                                            int page)
        {
            string dados = await _repository.GetProdutosSubGrupo(grupo, subgrupo, page);
            return dados;
        }






    }
}
