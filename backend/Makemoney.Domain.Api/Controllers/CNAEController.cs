using Makemoney.Domain.Models;
using Makemoney.Domain.ViewModels;
using Makemoney.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Api.Controllers
{

    [ApiController]
    [Route("api/makemoney/cnae")]
    public class CnaeController : ControllerBase
    {
        private readonly ICNAERepository _repository;

        public CnaeController(ICNAERepository repository)
        {
            _repository = repository;
            
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CNAEModel>>> Get()
        {
            var obj = await _repository.FindAll();
            return Ok(obj);
        }

        [HttpGet]
        [Route("{codigo}")]
        public async Task<ActionResult<IEnumerable<CNAEModel>>> Get(string codigo)
        {
            var obj = await _repository.FindById(codigo);
            return Ok(obj);
        }


        [HttpPost]
        public async Task<ActionResult<CNAEModel>> Post([FromBody]CNAEModel model)
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
        [Route("{codigo}")]
        public async Task<ActionResult<ResultViewModel>> Put(string codigo, [FromBody] CNAEModel obj)
        {
            if (codigo != obj.codigo)
            {
                return ResultViewModel.Mensagem(false, "Registro não encontrado !!!", obj);

            }

            if (obj.codigo != null)
            {
                await _repository.Update(codigo, obj);
            }

            return ResultViewModel.Mensagem(true, "Registro alterado com sucess !!!", obj);

        }


        [HttpDelete]
        [Route("{codigo}")]

        public ResultViewModel Delete(string codigo)
        {
            if (codigo != null)
            {
                _repository.Delete(codigo);

                return ResultViewModel.Mensagem(true, "Registro deletado com sucesso !!!", null);

            }

            return ResultViewModel.Mensagem(false, "Não foi possível deletar o registro !!!", null);

        }


    }



}
