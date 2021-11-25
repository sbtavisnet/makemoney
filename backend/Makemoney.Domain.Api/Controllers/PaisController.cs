using Makemoney.Domain.Models;
using Makemoney.Domain.ViewModels;
using Makemoney.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Makemoney.Domain.Api.Controllers
{

    [ApiController]
    [Route("api/makemoney/paises")]
    public class PaisController : ControllerBase
    {
        private readonly IPaisRepository _repository;

        public PaisController(IPaisRepository repository)
        {
            _repository = repository;
            
        }

        [HttpGet]
        public async Task<ActionResult<ResultViewModel>> Get()
        {
            var obj = await _repository.FindAll();
            return ResultViewModel.Mensagem(true, "Sucesso" , obj);
        
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ResultViewModel>> Get(int id)
        {
            var obj = await _repository.FindById(id);
            return ResultViewModel.Mensagem(true, "Sucesso", obj);

        }


        [HttpPost]
        public async Task<ActionResult<ResultViewModel>> Post([FromBody] PaisModel model)
        {
            // Verifica se os dados são válidos
            if (!ModelState.IsValid)
            {
                return ResultViewModel.Mensagem(false, "Error", ModelState);

            }
            await _repository.Insert(model);
            
            return ResultViewModel.Mensagem(true, "Registro cadastrado com sucesso !!!", model);

        }


        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<ResultViewModel>> Put(int id, [FromBody] PaisModel obj)
        {
            if (id != obj.Id)
            {
                return ResultViewModel.Mensagem(false, "Registro não encontrado !!!", obj);

            }

            if (obj.Id > 0)
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
