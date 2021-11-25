using Makemoney.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Makemoney.Domain.ViewModels.Response;

namespace Makemoney.Domain.Interfaces
{

    public interface ISubGrupoRepository
    {

        Task<IEnumerable<SubGrupoModel>> FindAll();
        
        Task<SubGrupoModel> FindById(int id);
        Task<IEnumerable<SubGrupoModel>> FindByGrupoId(int grupoid);

        Task<SubGrupoModel> Insert(SubGrupoModel obj);

        Task<SubGrupoModel> Update(int id, SubGrupoModel obj);
        Task<SubGrupoModel> Delete(int id);

        Task<bool> Existe(int id);

        string GetUltimoSubGrupo();

    }
}
