
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Makemoney.domain.infra.Data;
using Makemoney.Domain.Interfaces;
using Makemoney.Domain.Infra.Repository;

using Makemoney.Domain.Handler;

namespace Makemoney.Domain.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddControllers();
            services.AddDbContext<DataDBContext>(options =>
                options.UseMySql(Configuration.GetConnectionString("ConnectionMySql")));
            // abre e fecha a conexao do banco a cada requisicao
            //services.AddScoped<DataDBContext, DataDBContext>();

            services.AddTransient<IParsisRepository, ParsisRepository>();
            services.AddTransient<IEstadoRepository, EstadoRepository>();
            services.AddTransient<ICNAERepository, CNAERepository>();
            services.AddTransient<IPaisRepository, PaisRepository>();
            services.AddTransient<ICidadeRepository, CidadeRepository>();
            services.AddTransient<IMunicipioRepository, MunicipioRepository>();
            services.AddTransient<IClienteRepository, ClienteRepository>();

            services.AddTransient<IGrupoRepository, GrupoRepository>();
            services.AddTransient<ISubGrupoRepository, SubGrupoRepository>();

            // Handlers
            services.AddTransient<ParsisHandler, ParsisHandler>();
            services.AddTransient<ClienteHandler, ClienteHandler>();
            services.AddTransient<GrupoHandler, GrupoHandler>();


            // CORS 
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            });

            // documento a api 
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "API Makemoney",
                    Version = "v1",
                    Description = "Makemoney",
                });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // CORS
            app.UseCors(
                 options => options.AllowAnyOrigin()
                 .AllowAnyHeader()
                 .AllowAnyMethod()
                 .AllowAnyOrigin()
                 );

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v1/swagger.json", "API MakeMoney"));
        }
    }
}
