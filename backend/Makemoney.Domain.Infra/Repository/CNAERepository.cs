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
    public class CNAERepository : ICNAERepository
    {

        private readonly DataDBContext _context;
        public CNAERepository(DataDBContext context) {
            _context = context;
        }

       
        public async Task<IEnumerable<CNAEModel>> FindAll() {

            return await _context.CNAE.AsNoTracking().ToListAsync();

        }
        
        public async Task<bool> Existe(string codigo)
        {
            return await _context.CNAE.AnyAsync(e => e.codigo == codigo);

        }

        public async Task<CNAEModel> FindById(string codigo)
        {
             return await _context.CNAE.FindAsync(codigo);

        }

        public async Task<CNAEModel> Insert(CNAEModel obj)
        {
            _context.Add(obj);
            await _context.SaveChangesAsync();

            return obj;

        }

        public async Task<CNAEModel> Update(string codigo, CNAEModel obj)
        {
            {
                var hasAny = _context.CNAE.Any(x => x.codigo == codigo);
                if (!hasAny)
                {
                    throw new NotFoundException("Código não existe !!!");
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


        public async Task<CNAEModel> Delete(string codigo)
        {
            try
            {
                var obj = _context.CNAE.Find(codigo);
                _context.CNAE.Remove(obj);

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

