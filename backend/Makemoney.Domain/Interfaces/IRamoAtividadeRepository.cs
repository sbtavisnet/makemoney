using Makemoney.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Makemoney.Domain.Interfaces
{
    public interface IRamoAtividadeRepository
    {
        Task<IEnumerable<RamoAtividadeModel>> FindAll();

        Task<RamoAtividadeModel> FindById(int id);

        Task<RamoAtividadeModel> Insert(RamoAtividadeModel obj);

        Task<RamoAtividadeModel> Update(int id, RamoAtividadeModel obj);
        Task<RamoAtividadeModel> Delete(int id);

        Task<bool> Existe(int id);

    }
}
