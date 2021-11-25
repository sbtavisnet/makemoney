using Makemoney.Domain.Models;
using Makemoney.Domain.ViewModels;
using Makemoney.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

using System.Threading.Tasks;
using Makemoney.Domain.Handler;

namespace Makemoney.Domain.Api.Controllers
{

    [ApiController]
    [Route("api/makemoney/grupos")]
    public class GrupoController : ControllerBase
    {
        private readonly IGrupoRepository _repository;
        private readonly GrupoHandler _grupoHandler;


        public GrupoController(IGrupoRepository repository,
               GrupoHandler grupoHandler)
        {
            _repository = repository;
            _grupoHandler = grupoHandler;
        }


        [HttpGet]
        public async Task<ActionResult<ResultViewModel>> Get()
        {
            var obj = await _repository.FindAll();
            return ResultViewModel.Mensagem(true, "Sucesso", obj);

        }

        [HttpGet]
        [Route("gruposubgrupo")]
        public async Task<ActionResult<ResultViewModel>> GetGrupoSubGrupoAll()
        {
            var obj = await _repository.FindAllGrupoSubGrupo();
            return ResultViewModel.Mensagem(true, "Sucesso", obj);

        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ResultViewModel>> Get(int id)
        {
            var obj = await _repository.FindById(id);
            return ResultViewModel.Mensagem(true, "Sucesso", obj);
        }


        [HttpPost]
        public async Task<ActionResult<ResultViewModel>> Post([FromBody] GrupoModel model)
        {
            // Verifica se os dados são válidos
            if (!ModelState.IsValid)
            {
                return ResultViewModel.Mensagem(false, "Error", BadRequest(ModelState));
            }
            //return await _grupoHandler.Insert(model);
            var obj = await _grupoHandler.Insert(model);
            return ResultViewModel.Mensagem(true, "Sucesso", obj);

        }


        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<ResultViewModel>> Put(int id, [FromBody] GrupoModel obj)
        {
            return await _grupoHandler.Update(id, obj);
        }


        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<ResultViewModel>> Delete(int id)
        {
            return await _grupoHandler.Delete(id);
        }


    }



}
