using makeb2b.DTO;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace makeb2b.Repository
{
    public class ClienteRepository
    {
        HttpClient _api = new HttpClient();
        private string _url = CONST.Constants.ROUTER;

        
        public ClienteRepository()
        {
            _api.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

        }


        public async Task<String> GetClientes(int APage)
        {

            string aurl = _url + "clientes?page=" + APage;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }




        public async Task<String> GetCliente(string codigo)
        {

            string aurl = _url + "clientes/" + codigo;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }



        public async Task<String> GetClienteCNPJ(string cnpj)
        {

            string aurl = _url + "clientes/cnpj/" + cnpj;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }


        public async Task<String> GetClienteCNPJSenha(string cnpj)
        {

            string aurl = _url + "clientes/cnpj/senha/" + cnpj;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }


        public async Task<String> GetClienteTitulos(string codigo)
        {

            string aurl = _url + "clientes/titulos/" + codigo;
            HttpResponseMessage response = await _api.GetAsync(aurl);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }

        public async Task<String> GetClienteLogin(string cnpj, LoginDTO obj)
        {
            string aurl = _url + "clientes/login/" + cnpj;

            var data = new StringContent(
               JsonSerializer.Serialize(obj),      
               Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _api.PostAsync(aurl, data);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }

        public async Task<String> DoAlterarSenha(string cnpj, AlterarSenhaDTO obj)
        {
            string aurl = _url + "clientes/alterarsenha/"+cnpj;

            var data = new StringContent(
               JsonSerializer.Serialize(obj),
               Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _api.PostAsync(aurl, data);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }


        public async Task<String> DoCliente(string codigo, ClienteUpdateDTO obj)
        {
            string aurl = _url + "clientes/" + codigo;

            var data = new StringContent(
               JsonSerializer.Serialize(obj),
               Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _api.PostAsync(aurl, data);
            if (response.IsSuccessStatusCode)
            {
                var dados = await response.Content.ReadAsStringAsync();
                return dados;

            }
            return null;
        }


    }
}
