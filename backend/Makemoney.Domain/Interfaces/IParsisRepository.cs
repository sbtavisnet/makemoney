using Makemoney.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Interfaces
{

    public interface IParsisRepository
    {

        Task<IEnumerable<ParsisModel>> FindAll();
        
        Task<ParsisModel> FindById(int? id);

        Task<ParsisModel> Insert(ParsisModel obj);

        Task<ParsisModel>  Update(int id, ParsisModel obj);
        Task<ParsisModel> Delete(int id);

        Task<bool> Existe(int id);

        Task<bool> IsCNPJ(string cnpj);



    }
}
