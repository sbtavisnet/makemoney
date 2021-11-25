using Flunt.Notifications;


using Makemoney.Domain.Interfaces;
using Makemoney.Domain.Models;
using Makemoney.Domain.Shared.Libraries;
using Makemoney.Domain.ViewModels;
using System.Threading.Tasks;

namespace Makemoney.Domain.Handler
{
    public class SubGrupoHandler : Notifiable
    {
        private readonly ISubGrupoRepository _repository;

        public SubGrupoHandler(ISubGrupoRepository repository) {
            _repository = repository;
        }


        public async Task<ResultViewModel> Insert(SubGrupoModel obj)
        {
            obj.Ativo = "S";

            if (obj.Codigo == null)
            {
                var codigo = AvisnetUtil.StringToInt(_repository.GetUltimoSubGrupo()) + 1;
                obj.Codigo = AvisnetUtil.Zeros(codigo.ToString(), 2);
            }


            await _repository.Insert(obj);
            return ResultViewModel.Mensagem(true, "Sucesso", obj);
        }


        public async Task<ResultViewModel> Update(int id, SubGrupoModel obj)
        {

            if (id != obj.Id)
            {
                return ResultViewModel.Mensagem(false, "Registro não encontrado !!!", obj);
            }

            if (obj.Id > 0)
            {
                await _repository.Update(id, obj);
            }
            return ResultViewModel.Mensagem(true, "Registro alterado com sucesso !!!", obj);

        }


        public ResultViewModel Delete(int id)
        {
            if (id > 0)
            {
                var obj = _repository.Delete(id);
                if (obj.Result == null)
                    return ResultViewModel.Mensagem(false, "Registro não encontrado !!!", null);

                return ResultViewModel.Mensagem(true, "Registro deletado com sucesso !!!", null);

            }

            return ResultViewModel.Mensagem(false, "Não foi possível deletar o registro !!!", null);

        }



    }
}
