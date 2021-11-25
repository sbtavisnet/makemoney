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
    public class ClienteRepository : IClienteRepository
    {

        private readonly DataDBContext _context;
        public ClienteRepository(DataDBContext context) {
            _context = context;
        }

       
        public async Task<IEnumerable<ClienteModel>> FindAll() {

            return await _context.Clientes.AsNoTracking().ToListAsync();

        }
              

        public async Task<bool> Existe(int id)
        {
            return await _context.Clientes.AnyAsync(e => e.Id == id);

        }

        public async Task<ClienteModel> FindById(int id)
        {
             return await _context.Clientes.FindAsync(id);

        }

        public async Task<ClienteModel> Insert(ClienteModel obj)
        {
            _context.Add(obj);
            await _context.SaveChangesAsync();

            return obj;

        }

        public async Task<ClienteModel> Update(int id, ClienteModel obj)
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


        public async Task<ClienteModel> Delete(int id)
        {
            try
            {
                var obj = _context.Clientes.Find(id);
                _context.Clientes.Remove(obj);

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

