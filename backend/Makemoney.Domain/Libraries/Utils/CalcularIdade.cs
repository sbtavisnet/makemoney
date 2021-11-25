using System;

namespace Makemoney.Domain.Libraries.Utils
{
    public class CalcularIdade
    {
     
        public CalcularIdade() { 
        }

        public static void CalcularIdades(DateTime dataNascimento)
        {

            DateTime dataAtual = DateTime.Now;
            int anos = new DateTime(DateTime.Now.Subtract(dataNascimento).Ticks).Year - 1;
            DateTime anosCorridos = dataNascimento.AddYears(anos);
            int meses = 0;
            for (int i = 1; i < 12; i++)
            {
                if (anosCorridos.AddMonths(i) == dataAtual)
                {
                    meses = i;
                    break;
                }
                else if (anosCorridos.AddMonths(i) >= dataAtual)
                {
                    meses = i - 1;
                    break;
                }
            }
            int dias = dataAtual.Subtract(anosCorridos.AddMonths(meses)).Days;
            int horas = dataAtual.Subtract(anosCorridos).Hours;
            int minutos = dataAtual.Subtract(anosCorridos).Minutes;
            int segundos = dataAtual.Subtract(anosCorridos).Seconds;

            GetAnos(anos);
            GetAnos(meses);
            GetAnos(dias);


        }


        public static int GetAnos(int anos)
        {
            return anos;
        }

        public static int GetMeses(int meses)
        {
            return meses;
        }

        public static int GetDias(int dias)
        {
            return dias;
        }


    }



}
