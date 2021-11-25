using Makemoney.Domain.Models;
using Makemoney.Domain.ViewModels.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Interfaces
{
    public interface IGrupoRepository
    {

        Task<IEnumerable<GrupoModel>> FindAll();

        Task<IEnumerable<GrupoModel>> FindAllGrupoSubGrupo();

        Task<GrupoModel> FindById(int id);

        Task<GrupoModel> Insert(GrupoModel obj);

        Task<GrupoModel> Update(int id, GrupoModel obj);
        Task<GrupoModel> Delete(int id);

        Task<bool> Existe(int id);

        string GetUltimoGrupo();

    }
}
