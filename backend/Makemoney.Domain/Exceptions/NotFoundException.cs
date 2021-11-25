using System;

namespace Makemoney.Domain.Infra.Repository.Exceptions
{
    public class NotFoundException : ApplicationException
    {
        public NotFoundException(string message) : base(message)
        {

        }

    }
}
