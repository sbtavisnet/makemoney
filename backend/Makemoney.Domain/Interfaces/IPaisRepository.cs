using Makemoney.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Makemoney.Domain.Interfaces
{
    public interface IPaisRepository
    {
        Task<IEnumerable<PaisModel>> FindAll();

        Task<PaisModel> FindById(int id);

        Task<PaisModel> Insert(PaisModel obj);

        Task<PaisModel> Update(int id, PaisModel obj);
        Task<PaisModel> Delete(int id);

        Task<bool> Existe(int id);

    }
}
