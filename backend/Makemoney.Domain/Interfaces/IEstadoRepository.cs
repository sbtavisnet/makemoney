using Makemoney.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Interfaces
{

    public interface IEstadoRepository
    {

        Task<IEnumerable<EstadoModel>> FindAll();

        Task<EstadoModel> FindById(string uf);

        Task<EstadoModel> Insert(EstadoModel obj);

        Task<EstadoModel>  Update(string uf, EstadoModel obj);
        Task<EstadoModel> Delete(string uf);

        Task<bool> Existe(string uf);

    }
}
