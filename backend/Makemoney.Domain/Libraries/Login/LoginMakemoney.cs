using Makemoney.Domain.Models;
using Newtonsoft.Json;

namespace Makemoney.Domain.Libraries.Login
{
    public class LoginMakemoney
    {
        private string Key = "Login.Makemoney";
        private Sessao.Sessao _sessao;
        public LoginMakemoney(Sessao.Sessao sessao)
        {
            _sessao = sessao;
        }

        //public void Login(Igreja igreja)
        //{
        //    //Serializar
        //    string clienteJSONString = JsonConvert.SerializeObject(igreja);

        //    _sessao.Insert(Key, clienteJSONString);
        //}

        //public Igreja GetIgreja()
        //{
        //    //Deserializar
        //    if (_sessao.Existe(Key))
        //    {
        //        string igrejaJSONString = _sessao.FindAll(Key);
        //        return JsonConvert.DeserializeObject<Igreja>(igrejaJSONString); ;
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}

        public void Logout()
        {
            _sessao.RemoverTodos();
        }
    }
}

