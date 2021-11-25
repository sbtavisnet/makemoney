using Makemoney.Domain.Models;
using Makemoney.Domain.Infra.Repository.Exceptions;
using Makemoney.domain.infra.Data;
using Makemoney.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Makemoney.Domain.ValuesObjects;

namespace Makemoney.Domain.Infra.Repository
{
    public class ParsisRepository : IParsisRepository
    {

        private readonly DataDBContext _context;
        public ParsisRepository(DataDBContext context) {
            _context = context;
        }
        
        public async Task<bool> Existe(int id)
        {
             
            return await _context.Parsis.AnyAsync(e => e.Id == id);

        }

        public async Task<IEnumerable<ParsisModel>> FindAll()
        {
            
            return await _context.Parsis.AsNoTracking().ToListAsync();

        }
        public async Task<ParsisModel> FindById(int? id)
        {
             return await _context.Parsis.FindAsync(id);

        }

        public async Task<ParsisModel> Insert(ParsisModel obj)
        {
            try
            {
                _context.Add(obj);
                await _context.SaveChangesAsync();

            }
            catch (DbConcurrencyException e)
            {
                throw new DbConcurrencyException(e.Message);
            }

            return obj;

        }

        public async Task<ParsisModel> Update(int id, ParsisModel obj)
        {
            {
                var hasAny = _context.Parsis.Any(x => x.Id == id);
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


        public async Task<ParsisModel> Delete(int id)
        {
            try
            {
                var obj = _context.Parsis.Find(id);
                _context.Parsis.Remove(obj);

                await _context.SaveChangesAsync();

                return obj;

            }
            catch (DbUpdateException e)
            {

                throw new IntegrityException(e.Message);
            }

        }



        public async Task<bool> IsCNPJ(string cnpj)
        {

            return await _context.Parsis.AnyAsync(e => e.CNPJ == cnpj);

        }


    }
}

