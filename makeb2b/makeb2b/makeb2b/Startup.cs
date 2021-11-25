using makeb2b.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;

namespace makeb2b
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
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MAKEB2B", Version = "v1" });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);

            });

            services.AddControllers();

            services.AddTransient<AvisnetRepository, AvisnetRepository>();
            services.AddTransient<EmailRepository, EmailRepository>();
            services.AddTransient<GrupoRepository, GrupoRepository>();
            services.AddTransient<ClienteRepository, ClienteRepository>();
            services.AddTransient<ProdutoRepository, ProdutoRepository>();
            services.AddTransient<VendaRepository, VendaRepository>();
            services.AddTransient<BoletoRepository, BoletoRepository>();
            services.AddTransient<EcommerceRepository, EcommerceRepository>();

            // CORS 
            //services.AddCors(c =>
            //{
            //    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
            //});

            //services.AddCors(c =>
            //{
            //    c.AddPolicy("AllowOrigin",
            //         options => options.WithOrigins("http://localhost:8100/",
            //         "https://jpp.avisnet.com.br")
            //    );
            //});

            services.AddCors(options =>
            {
                options.AddPolicy("Policy",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:8100",
                             "https://localhost:44327", // localhost
                             "https://avisnetinfo.com.br")   
                        .AllowAnyHeader();
                    });
            });


            services.AddHttpClient();

            services.Configure<IISOptions>(options =>
            {
                options.ForwardClientCertificate = false;
            });

            // compressao de dados no json
            services.AddResponseCompression();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "makeb2b v1"));

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            // CORS
            app.UseCors(
                 options => options.AllowAnyOrigin()
                 .AllowAnyHeader()
                 .AllowAnyMethod()
                 .AllowAnyOrigin()
            );

            app.UseResponseCompression();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    };

}

/*
 * Documentacao: Swagger para mostrar os comentarios na api
 * https://www.treinaweb.com.br/blog/documentando-uma-asp-net-core-web-api-com-o-swagger
*/




