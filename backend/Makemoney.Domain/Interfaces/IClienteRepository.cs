using Makemoney.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Interfaces
{

    public interface IClienteRepository
    {

        Task<IEnumerable<ClienteModel>> FindAll();
       
        Task<ClienteModel> FindById(int id);

        Task<ClienteModel> Insert(ClienteModel obj);

        Task<ClienteModel> Update(int id, ClienteModel obj);
        Task<ClienteModel> Delete(int id);

        Task<bool> Existe(int id);

    }
}
