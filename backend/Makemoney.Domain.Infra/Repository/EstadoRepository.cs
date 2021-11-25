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
    public class EstadoRepository : IEstadoRepository
    {

        private readonly DataDBContext _context;
        public EstadoRepository(DataDBContext context) {
            _context = context;
        }

       
        public async Task<IEnumerable<EstadoModel>> FindAll() {

            return await _context.Estados.AsNoTracking().ToListAsync();

        }
        //IEnumerable<Task<EstadoModel>> FindAll();

        

        public async Task<bool> Existe(string uf)
        {
            return await _context.Estados.AnyAsync(e => e.UF == uf);

        }

        public async Task<EstadoModel> FindById(string uf)
        {
             return await _context.Estados.FindAsync(uf);

        }

        public async Task<EstadoModel> Insert(EstadoModel obj)
        {
            _context.Add(obj);
            await _context.SaveChangesAsync();

            return obj;

        }

        public async Task<EstadoModel> Update(string uf, EstadoModel obj)
        {
            {
                var hasAny = _context.Estados.Any(x => x.UF == uf);
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


        public async Task<EstadoModel> Delete(string uf)
        {
            try
            {
                var obj = _context.Estados.Find(uf);
                _context.Estados.Remove(obj);

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

