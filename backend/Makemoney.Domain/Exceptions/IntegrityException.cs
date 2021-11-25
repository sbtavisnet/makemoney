using System;

namespace Makemoney.Domain.Infra.Repository.Exceptions
{
    public class IntegrityException : ApplicationException
    {
        public IntegrityException(string message) : base(message)
        {

        }
    }
}
