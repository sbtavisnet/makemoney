using Makemoney.Domain.Commands.CommandsUpdate;
using Makemoney.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Makemoney.Domain.Interfaces
{

    public interface IProdutoRepository
    {
        Task<IEnumerable<ProdutoModel>> FindAll();
       
        Task<ProdutoModel> FindById(int id);

        Task<ProdutoModel> Insert(ProdutoModel obj);

        Task<ProdutoModel> Update(int id, ProdutoModel obj);
        Task<ProdutoModel> Delete(int id);

        Task<bool> Existe(int id);

        Task<string> CodigoAutoinc(string codigo);



    }
}
