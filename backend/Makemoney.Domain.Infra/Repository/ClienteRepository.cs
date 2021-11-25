using Makemoney.Domain.Models;
using Makemoney.Domain.Infra.Repository.Exceptions;
using Makemoney.domain.infra.Data;
using Makemoney.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace Makemoney.Domain.Infra.Repository
{
    public class CidadeRepository : ICidadeRepository
    {

        private readonly DataDBContext _context;
        public CidadeRepository(DataDBContext context) {
            _context = context;
        }

       
        public async Task<IEnumerable<CidadeModel>> FindAll() {

            return await _context.Cidades.AsNoTracking().ToListAsync();

        }
              

        public async Task<bool> Existe(int id)
        {
            return await _context.Cidades.AnyAsync(e => e.Id == id);

        }

        public async Task<CidadeModel> FindById(int id)
        {
             return await _context.Cidades.FindAsync(id);

        }

        public async Task<CidadeModel> Insert(CidadeModel obj)
        {
            _context.Add(obj);
            await _context.SaveChangesAsync();

            return obj;

        }

        public async Task<CidadeModel> Update(int id, CidadeModel obj)
        {
            {
                var hasAny = _context.Cidades.Any(x => x.Id == id);
                if (!hasAny)
                {
                    throw new NotFoundException("Id não existe !!!");
                }

                try
                {
                    _context.Update(obj);
                    await _context.SaveChangesAsync();


                }
                catch (DbConcurrencyException e)
                {
                    throw new DbConcurrencyException(e.Message);
                }
                return obj;
            }
        }


        public async Task<CidadeModel> Delete(int id)
        {
            try
            {
                var obj = _context.Cidades.Find(id);
                _context.Cidades.Remove(obj);

                await _context.SaveChangesAsync();

                return obj;

            }
            catch (DbUpdateException e)
            {

                throw new IntegrityException(e.Message);
            }

        }

        
    }
}

