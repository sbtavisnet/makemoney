
using Makemoney.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Makemoney.domain.infra.Data
{
    public class DataDBContext : DbContext
    {

        public DataDBContext(DbContextOptions<DataDBContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //base.OnModelCreating(builder);
            //builder.Entity<GrupoModel>()
            //    .HasMany(r => r.SubGrupos)
            //    .WithOne(p => p.Grupo);


        }
        

        public DbSet<ParsisModel> Parsis { get; set; }
        public DbSet<EstadoModel> Estados { get; set; }
        public DbSet<CNAEModel> CNAE { get; set; }
        public DbSet<PaisModel> Paises { get; set; }
        public DbSet<CidadeModel> Cidades { get; set; }
        public DbSet<MunicipioModel> Municipios { get; set; }
        public DbSet<ClienteModel> Clientes { get; set; }
        public DbSet<GrupoModel> Grupos { get; set; }
        public DbSet<SubGrupoModel> SubGrupos { get; set; }



    }
}

