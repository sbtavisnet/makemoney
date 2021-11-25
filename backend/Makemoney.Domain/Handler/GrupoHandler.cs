using Flunt.Notifications;
using System;
using System.Threading.Tasks;

using Makemoney.Domain.Interfaces;
using Makemoney.Domain.Models;
using Makemoney.Domain.ViewModels;
using Makemoney.Domain.Shared.Libraries;

namespace Makemoney.Domain.Handler
{
    public class GrupoHandler : Notifiable
    {
        
        private readonly IGrupoRepository _repository;
                

        public GrupoHandler(IGrupoRepository repository) {
            _repository = repository;
        }


        public async Task<GrupoModel> Insert(GrupoModel obj)
        {
            obj.Ativo = "S";

            if (obj.Codigo == null)
            {
                var codigo = AvisnetUtil.StringToInt(_repository.GetUltimoGrupo()) + 1;
                obj.Codigo = AvisnetUtil.Zeros( codigo.ToString(), 6 );
            }

            return await _repository.Insert(obj);

            
        }


        public async Task<ResultViewModel> Update(int id, GrupoModel obj)
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


        public async Task<ResultViewModel> Delete(int id)
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


    


