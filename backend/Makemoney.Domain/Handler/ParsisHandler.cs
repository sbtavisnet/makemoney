using Flunt.Notifications;


using Makemoney.Domain.Interfaces;
using Makemoney.Domain.Models;
using Makemoney.Domain.ValuesObjects;
using Makemoney.Domain.ViewModels;
using System.Threading.Tasks;

namespace Makemoney.Domain.Handler
{
    public class ParsisHandler : Notifiable
    {
        private readonly IParsisRepository _repository;

        public ParsisHandler(IParsisRepository repository) {
            _repository = repository;
        }


        public async Task<ResultViewModel> Insert(ParsisModel obj)
        {

            Emails email = new Emails(obj.Email);
            if (email.Invalid)
                return ResultViewModel.Mensagem(false, "E-mail não permitido !!!", email.Notifications);

            if (await _repository.IsCNPJ(obj.CNPJ) ) 
            {
                return ResultViewModel.Mensagem(false, "CNPJ ou CPF já cadastrado !!!", null);

            }

            obj.Ativo = "S";
            //obj.FJ = "J";

            await _repository.Insert(obj);

            return ResultViewModel.Mensagem(true, "Sucesso", obj);


        }


        public async Task<ResultViewModel> Update(int id, ParsisModel obj)
        {

            if (id != obj.Id)
            {
                return ResultViewModel.Mensagem(false, "Registro não encontrado !!!", obj);
            }

            Emails email = new Emails(obj.Email);
            if (email.Invalid)
                return ResultViewModel.Mensagem(false, "E-mail não permitido !!!", email.Notifications);

            if (obj.Id > 0)
            {
                obj.Ativo = "S";
                //obj.FJ = "J";
                await _repository.Update(id, obj);
            }
            return ResultViewModel.Mensagem(true, "Registro alterado com sucesso !!!", obj);

        }


        public ResultViewModel Delete(int id)
        {
            if (id > 0)
            {
                _repository.Delete(id);

                return ResultViewModel.Mensagem(true, "Registro deletado com sucesso !!!", null);

            }

            return ResultViewModel.Mensagem(false, "Não foi possível deletar o registro !!!", null);

        }



    }
}
