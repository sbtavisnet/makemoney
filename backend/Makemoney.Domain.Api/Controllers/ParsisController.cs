using Makemoney.Domain.Models;
using Makemoney.Domain.ViewModels;
using Makemoney.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

using Makemoney.Domain.Handler;

namespace Makemoney.Domain.Api.Controllers
{
    [ApiController]
    [Route("api/makemoney/parsis")]
    public class ParsisController : ControllerBase
    {
        private readonly IParsisRepository _repository;
        private readonly ParsisHandler _parsisHandler;

        public ParsisController(IParsisRepository repository, 
            ParsisHandler parsisHandler)
        {
            _repository = repository;
            _parsisHandler = parsisHandler;
            
        }

        [HttpGet]
        public async Task<ActionResult<ResultViewModel>> Get()
        {
            var obj = await _repository.FindAll();
            return ResultViewModel.Mensagem(true, "Sucesso", obj);
            
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<ResultViewModel>> Get(int id)
        {
            var obj = await _repository.FindById(id);
            return ResultViewModel.Mensagem(true, "Sucesso", obj);
            
        }

        [HttpPost]
        public async Task<ActionResult<ResultViewModel>> Post([FromBody]ParsisModel model)
        {
            return await _parsisHandler.Insert(model);

        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult<ResultViewModel>> Put(int id, [FromBody] ParsisModel obj)
        {
            return await _parsisHandler.Update(id, obj);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult<ResultViewModel>> Delete(int id)
        {
            return _parsisHandler.Delete(id);
        }


    }



}
