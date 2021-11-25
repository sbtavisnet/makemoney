using Makemoney.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Makemoney.Domain.Interfaces
{
    public interface ICNAERepository
    {
        Task<IEnumerable<CNAEModel>> FindAll();

        Task<CNAEModel> FindById(string codigo);

        Task<CNAEModel> Insert(CNAEModel obj);

        Task<CNAEModel> Update(string codigo, CNAEModel obj);
        Task<CNAEModel> Delete(string codigo);

        Task<bool> Existe(string codigo);

    }
}
