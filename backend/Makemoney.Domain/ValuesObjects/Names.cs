using Flunt.Validations;
using Makemoney.Domain.Shared.ValueObjects;

namespace Makemoney.Domain.ValuesObjects
{
    public class Names : ValueObject
    {
        public Names(string name)
        {
            Name = name;

            //AddNotifications(new Contract()
            //    .Requires()
            //    .HasMinLen(Name, 3, "Names.Name", "Campo deve conter no minimo 3 caracteres !"));
            
           if (string.IsNullOrEmpty(Name))
              AddNotification("Names.Name", "Campo inválido !");

        }

        public string Name{ get; private set; }



    }
}
