using Makemoney.Domain.Models;
using Makemoney.Domain.ViewModels;
using Makemoney.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Api.Controllers
{

    [ApiController]
    [Route("api/makemoney/estados")]
    public class EstadoController : ControllerBase
    {
        private readonly IEstadoRepository _repository;

        public EstadoController(IEstadoRepository repository)
        {
            _repository = repository;
            
        }
        [HttpGet]
        public async Task<ActionResult<ResultViewModel>> Get()
        {
            var obj = await _repository.FindAll();
            return ResultViewModel.Mensagem(true, "Sucesso", obj);
            
        }

        [HttpGet]
        [Route("{uf}")]
        public async Task<ActionResult<ResultViewModel>> Get(string uf)
        {
            var obj = await _repository.FindById(uf);
            return ResultViewModel.Mensagem(true, "Sucesso", obj);
        }


        [HttpPost]
        public async Task<ActionResult<ResultViewModel>> Post([FromBody]EstadoModel model)
        {
            // Verifica se os dados são válidos
            if (!ModelState.IsValid)
            {
                return ResultViewModel.Mensagem(false, "Error", BadRequest(ModelState));
            }
            await _repository.Insert(model);
            return ResultViewModel.Mensagem(true, "Registro gravado com sucesso !!", model);
        
        }


        [HttpPut]
        [Route("{uf}")]
        public async Task<ActionResult<ResultViewModel>> Put(string uf, [FromBody] EstadoModel obj)
        {
            if (uf != obj.UF)
            {
                return ResultViewModel.Mensagem(false, "Registro não encontrado !!!", obj);

            }

            if (obj.UF != null)
            {
                await _repository.Update(uf, obj);
            }

            return ResultViewModel.Mensagem(true, "Registro alterado com sucess !!!", obj);

        }


        [HttpDelete]
        [Route("{uf}")]

        public ResultViewModel Delete(string uf)
        {
            if (uf != null)
            {
                _repository.Delete(uf);

                return ResultViewModel.Mensagem(true, "Registro deletado com sucesso !!!", null);

            }

            return ResultViewModel.Mensagem(false, "Não foi possível deletar o registro !!!", null);

        }


    }



}
