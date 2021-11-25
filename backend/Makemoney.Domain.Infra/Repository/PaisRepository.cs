using Makemoney.Domain.Models;
using Makemoney.Domain.Infra.Repository.Exceptions;
using Makemoney.domain.infra.Data;
using Makemoney.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Makemoney.Domain.Infra.Repository
{
    public class PaisRepository : IPaisRepository
    {

        private readonly DataDBContext _context;
        public PaisRepository(DataDBContext context) {
            _context = context;
        }

       
        public async Task<IEnumerable<PaisModel>> FindAll() {

            return await _context.Paises.AsNoTracking().ToListAsync();

        }
              

        public async Task<bool> Existe(int id)
        {
            return await _context.Paises.AnyAsync(e => e.Id == id);

        }

        public async Task<PaisModel> FindById(int id)
        {
             return await _context.Paises.FindAsync(id);

        }

        public async Task<PaisModel> Insert(PaisModel obj)
        {
            _context.Add(obj);
            await _context.SaveChangesAsync();

            return obj;

        }

        public async Task<PaisModel> Update(int id, PaisModel obj)
        {
            {
                var hasAny = _context.Paises.Any(x => x.Id == id);
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


        public async Task<PaisModel> Delete(int id)
        {
            try
            {
                var obj = _context.Paises.Find(id);
                _context.Paises.Remove(obj);

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

