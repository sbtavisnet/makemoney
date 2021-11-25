using Flunt.Notifications;
using Makemoney.Domain.Commands;
using Makemoney.Domain.Commands.CommandsCreate;
using Makemoney.Domain.Interfaces;
using Makemoney.Domain.Models;
using Makemoney.Domain.ValuesObjects;
using Makemoney.Domain.ViewModels;
using System.Threading.Tasks;

namespace Makemoney.Domain.Handler
{
    public class ClienteHandler : 
        Notifiable, 
        IHandler<ClienteCreateCommand>
    {
        private readonly IClienteRepository _repository;

        public ClienteHandler(IClienteRepository repository) {
            _repository = repository;
        }

        public ICommandResult Handle(ClienteCreateCommand command)
        {
            throw new System.NotImplementedException();
        }

        
        public async Task<ResultViewModel> Insert(ClienteModel obj)
        {

            Emails email = new Emails(obj.Email);
            if (email.Invalid)
                return ResultViewModel.Mensagem(false, "E-mail não permitido !!!", email.Notifications);

            await _repository.Insert(obj);

            return ResultViewModel.Mensagem(true, "Sucesso", obj);
        }


        public async Task<ResultViewModel> Update(int id, ClienteModel obj)
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
