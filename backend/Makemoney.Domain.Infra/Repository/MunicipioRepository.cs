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
    public class MunicipioRepository : IMunicipioRepository
    {

        private readonly DataDBContext _context;
        public MunicipioRepository(DataDBContext context) {
            _context = context;
        }

       
        public async Task<IEnumerable<MunicipioModel>> FindAll() {

            return await _context.Municipios.AsNoTracking().ToListAsync();

        }
              

        public async Task<bool> Existe(string codigo)
        {
            return await _context.Municipios.AnyAsync(e => e.Codigo == codigo);

        }

        public async Task<MunicipioModel> FindById(string codigo)
        {
             return await _context.Municipios.FindAsync(codigo);

        }

        public async Task<MunicipioModel> Insert(MunicipioModel obj)
        {
            _context.Add(obj);
            await _context.SaveChangesAsync();

            return obj;

        }

        public async Task<MunicipioModel> Update(string codigo, MunicipioModel obj)
        {
            {
                var hasAny = _context.Municipios.Any(x => x.Codigo == codigo);
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


        public async Task<MunicipioModel> Delete(string codigo)
        {
            try
            {
                var obj = _context.Municipios.Find(codigo);
                _context.Municipios.Remove(obj);

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

