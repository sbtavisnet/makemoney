using Makemoney.domain.infra.Data;
using Makemoney.Domain.Infra.Repository.Exceptions;
using Makemoney.Domain.Interfaces;
using Makemoney.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Makemoney.Domain.Infra.Repository
{
    public class GrupoRepository : IGrupoRepository
    {

        private readonly DataDBContext _context;
        public GrupoRepository(DataDBContext context) {
            _context = context;
            
        }

        public async Task<IEnumerable<GrupoModel>> FindAll() {
          return await _context.Grupos
                .Include(x => x.SubGrupos)
                .AsNoTracking()
                .ToListAsync();
        }
        
        public async Task<IEnumerable<GrupoModel>> FindAllGrupoSubGrupo()
        {
            var lista = await _context.Grupos
                               .Include(x => x.SubGrupos)
                               .ToArrayAsync();
                               
            
            return lista;
            
        }


        //public async Task<IEnumerable<GrupoResponse>> FindAllGrupoSubGrupo()
        //{
        //    List<GrupoResponse> listamv = new List<GrupoResponse>();

        //    var lista = await (from grupo in _context.Grupos
        //                       join subgrupo in _context.SubGrupos
        //                       on grupo.Id equals subgrupo.GrupoId

        //                       select new
        //                       {
        //                           grupoId = grupo.Id,
        //                           grupoCodigo = grupo.Codigo,
        //                           grupoDescricao = grupo.Descricao,
        //                           grupoOrdem = grupo.Ordem,
        //                           grupoAtivo = grupo.Ativo,
        //                           grupoImagem = grupo.Imagem,
        //                           subgrupoId = subgrupo.Id,
        //                           subgrupoGrupoId = subgrupo.GrupoId,
        //                           subgrupoCodigo = subgrupo.Codigo,
        //                           subgrupoDescricao = subgrupo.Descricao
        //                       }).ToListAsync();

        //    foreach (var item in lista)
        //    {
        //        GrupoResponse grupoResponse = new GrupoResponse();

        //        grupoResponse.Id = item.grupoId;
        //        grupoResponse.Codigo = item.grupoCodigo;
        //        grupoResponse.Descricao = item.grupoDescricao;
        //        grupoResponse.Ordem = item.grupoOrdem;
        //        grupoResponse.Ativo = item.grupoAtivo;
        //        grupoResponse.Imagem = item.grupoImagem;

        //        foreach (var item1 in lista)
        //        {
        //            if (item1.grupoId == item1.subgrupoGrupoId)
        //            {
        //                SubGrupoResponse subgrupoResponse = new SubGrupoResponse();

        //                subgrupoResponse.Id = item1.subgrupoId;
        //                subgrupoResponse.Codigo = item1.subgrupoCodigo;
        //                subgrupoResponse.Descricao = item1.subgrupoDescricao;

        //                //grupoResponse.SubGrupos.Add(subgrupoResponse);

        //            }
        //        }

        //        listamv.Add(grupoResponse);

        //    }
        //    return listamv;

        //}



        //public async Task<IEnumerable<GrupoSubGrupoResponse>> FindAllGrupoSubGrupo()
        //{
        //    List<GrupoSubGrupoResponse> listamv = new List<GrupoSubGrupoResponse>();

        //    var lista = await (from grupo in _context.Grupos
        //                       join subgrupo in _context.SubGrupos
        //                       on grupo.Id equals subgrupo.GrupoId

        //                       select new
        //                       {
        //                           grupoId = grupo.Id,
        //                           grupoCodigo = grupo.Codigo,
        //                           grupoDescricao = grupo.Descricao,
        //                           grupoOrdem = grupo.Ordem,
        //                           grupoAtivo = grupo.Ativo,
        //                           grupoImagem = grupo.Imagem,
        //                           subgrupoId = subgrupo.Id,
        //                           subgrupoCodigo = subgrupo.Codigo,
        //                           subgrupoDescricao = subgrupo.Descricao
        //                       }).ToListAsync();

        //    foreach (var item in lista)
        //    {
        //        GrupoSubGrupoResponse vm = new GrupoSubGrupoResponse();

        //        vm.GrupoId = item.grupoId;
        //        vm.GrupoCodigo = item.grupoCodigo;
        //        vm.GrupoDescricao = item.grupoDescricao;
        //        vm.GrupoOrdem = item.grupoOrdem;
        //        vm.GrupoAtivo = item.grupoAtivo;
        //        vm.GrupoImagem = item.grupoImagem;
        //        vm.SubGrupoId = item.subgrupoId;
        //        vm.SubGrupoCodigo = item.subgrupoCodigo;
        //        vm.SubGrupoDescricao = item.subgrupoDescricao;

        //        listamv.Add(vm);

        //    }
        //    return listamv;

        //}


        public async Task<bool> Existe(int id)
        {
            return await _context.Grupos.AnyAsync(e => e.Id == id);

        }

        public async Task<GrupoModel> FindById(int id)
        {
             return await _context.Grupos.FindAsync(id);

        }

        public async Task<GrupoModel> Insert(GrupoModel obj)
        {
            _context.Add(obj);
            await _context.SaveChangesAsync();

            return obj;

        }

        public async Task<GrupoModel> Update(int id, GrupoModel obj)
        {
            {
                var hasAny = _context.Grupos.Any(x => x.Id == id);
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


        public async Task<GrupoModel> Delete(int id)
        {
            try
            {
                var obj = _context.Grupos.Find(id);
                _context.Grupos.Remove(obj);

                await _context.SaveChangesAsync();

                return obj;

            }
            catch (DbUpdateException e)
            {

                throw new IntegrityException(e.Message);
            }

        }


        public string GetUltimoGrupo()
        {
            var resultado = (from r in _context.Grupos
                             orderby r.Codigo descending
                             select r).First();

            return resultado.Codigo;
        }


    }
}

