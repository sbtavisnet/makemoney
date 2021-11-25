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
    public class SubGrupoRepository : ISubGrupoRepository
    {

        private readonly DataDBContext _context;
        public SubGrupoRepository(DataDBContext context) {
            _context = context;
        }

       
        public async Task<IEnumerable<SubGrupoModel>> FindAll() {

            return await _context.SubGrupos.AsNoTracking().ToListAsync();
           
        }
        
        

        public async Task<bool> Existe(int id)
        {
            return await _context.SubGrupos.AnyAsync(e => e.Id == id);

        }

        public async Task<SubGrupoModel> FindById(int id)
        {
             return await _context.SubGrupos.FindAsync(id);

        }

        public async Task<IEnumerable<SubGrupoModel>> FindByGrupoId(int grupoid)
        {
            return await _context.SubGrupos.Where(x => x.GrupoId == grupoid).AsNoTracking().ToListAsync();
            
        }

        public async Task<SubGrupoModel> Insert(SubGrupoModel obj)
        {
            _context.Add(obj);
            await _context.SaveChangesAsync();

            return obj;

        }

        public async Task<SubGrupoModel> Update(int id, SubGrupoModel obj)
        {
            {
                var hasAny = _context.SubGrupos.Any(x => x.Id == id);
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


        public async Task<SubGrupoModel> Delete(int id)
        {
            try
            {
                var obj = _context.SubGrupos.Find(id);
                _context.SubGrupos.Remove(obj);

                await _context.SaveChangesAsync();

                return obj;

            }
            catch (DbUpdateException e)
            {

                throw new IntegrityException(e.Message);
            }

        }

        public string GetUltimoSubGrupo()
        {
            var resultado = (from r in _context.SubGrupos
                             orderby r.Codigo descending
                             select r).First();

            return resultado.Codigo;
        }


    }
}

