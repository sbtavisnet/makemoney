using Makemoney.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Interfaces
{

    public interface IMunicipioRepository
    {

        Task<IEnumerable<MunicipioModel>> FindAll();
       
        Task<MunicipioModel> FindById(string codigo);

        Task<MunicipioModel> Insert(MunicipioModel obj);

        Task<MunicipioModel> Update(string codigo, MunicipioModel obj);
        Task<MunicipioModel> Delete(string codigo);

        Task<bool> Existe(string codigo);

    }
}
