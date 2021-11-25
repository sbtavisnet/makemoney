
using Makemoney.Domain.Shared.ValueObjects;

namespace Makemoney.Domain.ValuesObjects
{
    public class Endereco : ValueObject
    {
        public Endereco(string cep, 
                        string rua, 
                        string numero, 
                        string complemento, 
                        string bairro, 
                        string cidade, 
                        string uF)
        {
            Cep = cep;
            Rua = rua;
            Numero = numero;
            Complemento = complemento;
            Bairro = bairro;
            Cidade = cidade;
            UF = uF;
            
            /*
            AddNotifications(new Contract()
                .Requires()
                .HasMinLen(Rua, 3, "Endereco.Rua", "A rua deve conter pelo menos 3 caracteres")
            );
            */
            
            if (string.IsNullOrEmpty(Cep))
                AddNotification("Endereco.Cep", "Campo inválido !");

            if (string.IsNullOrEmpty(Rua))
                AddNotification("Endereco.Rua", "Campo inválido !");

            if (string.IsNullOrEmpty(Numero))
                AddNotification("Endereco.Numero", "Campo inválido !");

            if (string.IsNullOrEmpty(Bairro))
                AddNotification("Endereco.Bairro", "Campo inválido !");

            if (string.IsNullOrEmpty(Cidade))
                AddNotification("Endereco.Cidade", "Campo inválido !");

            if (string.IsNullOrEmpty(UF))
                AddNotification("Endereco.UF", "Campo inválido !");



        }

        public string Cep { get; set; }
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string UF { get; set; }

    }
}
