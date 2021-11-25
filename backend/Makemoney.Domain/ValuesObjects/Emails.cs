using Makemoney.Domain.Shared.ValueObjects;
using Flunt.Validations;



namespace Makemoney.Domain.ValuesObjects
{
    public class Emails : ValueObject
    {
        public Emails(string email) {
            Email = email;

            if (Email.Length > 0)
            {
                AddNotifications(new Contract()
                .Requires()
                .IsEmail(Email, "Email", "E-mail inválido !!!"));

            };
        }
        public string Email { get; private set; }

    }
}
