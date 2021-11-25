using System;
using System.Text.RegularExpressions;


namespace Makemoney.Domain.Shared.Libraries
{
    public class AvisnetUtil
    {

        public static int StringToInt(string value)
        {
            var val = SomenteNumeros(value);

            if (val == null || val.Length == 0)
                return 0;

            return Int32.Parse(val); ;
        }

        public static string SomenteNumeros(string value)
        {
            return Regex.Match(value, @"\d+").Value;
        }


        public static string Zeros(string value, int tamanho)
        {
            return value.PadLeft(tamanho, '0');
        }

        public static bool IsEmptyOrNull(string value)
        {
            if (value == null || value.Length == 0)
            {
                return true;
            }
            return false;
        }

    }
}
