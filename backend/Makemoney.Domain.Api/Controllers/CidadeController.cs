using Makemoney.Domain.Models;
using Makemoney.Domain.ViewModels;
using Makemoney.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Api.Controllers
{

    [ApiController]
    [Route("api/makemoney/cidades")]
    public class CidadeController : ControllerBase
    {
        private readonly ICidadeRepository _repository;

        public CidadeController(ICidadeRepository repository)
        {
            _repository = repository;
            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CidadeModel>>> Get()
        {
            var obj = await _repository.FindAll();
            return Ok(obj);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<IEnumerable<CidadeModel>>> Get(int id)
        {
            var obj = await _repository.FindById(id);
            return Ok(obj);
        }


        [HttpPost]
        public async Task<ActionResult<CidadeModel>> Post([FromBody]CidadeModel model)
        {
            // Verifica se os dados são válidos
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _repository.Insert(model);
            
            return Ok(model);
        
        }


        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<ResultViewModel>> Put(int id, [FromBody] CidadeModel obj)
        {
            if (id != obj.Id)
            {
                return ResultViewModel.Mensagem(false, "Registro não encontrado !!!", obj);

            }

            if (obj.Id != null)
            {
                await _repository.Update(id, obj);
            }

            return ResultViewModel.Mensagem(true, "Registro alterado com sucess !!!", obj);

        }


        [HttpDelete]
        [Route("{id}")]

        public ResultViewModel Delete(int id)
        {
            if (id != null)
            {
                _repository.Delete(id);

                return ResultViewModel.Mensagem(true, "Registro deletado com sucesso !!!", null);

            }

            return ResultViewModel.Mensagem(false, "Não foi possível deletar o registro !!!", null);

        }


    }



}
