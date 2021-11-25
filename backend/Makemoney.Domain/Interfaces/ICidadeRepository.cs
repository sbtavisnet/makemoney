using Makemoney.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Interfaces
{

    public interface ICidadeRepository
    {

        Task<IEnumerable<CidadeModel>> FindAll();
       
        Task<CidadeModel> FindById(int id);

        Task<CidadeModel> Insert(CidadeModel obj);

        Task<CidadeModel> Update(int id, CidadeModel obj);
        Task<CidadeModel> Delete(int id);

        Task<bool> Existe(int id);

    }
}
