import { Injectable } from "@angular/core";
import { DatePipe } from "@angular/common";

import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class UtilDatas {
  constructor(private datePipe: DatePipe, private toast: ToastController) {}

  meses = [
    {
      name: "Janeiro",
      value: 1
    },
    {
      name: "Fevereiro",
      value: 2
    },
    {
      name: "Março",
      value: 3
    },
    {
      name: "Abril",
      value: 4
    },
    {
      name: "Maio",
      value: 5
    },
    {
      name: "Junho",
      value: 6
    },
    {
      name: "Julho",
      value: 7
    },
    {
      name: "Agosto",
      value: 8
    },
    {
      name: "Setembro",
      value: 9
    },
    {
      name: "Outubro",
      value: 10
    },
    {
      name: "Novembro",
      value: 11
    },
    {
      name: "Dezembro",
      value: 12
    }
  ];

  private idadeAnos: number;
  private idadeMeses: number;

  public dataHoje() {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    return [dia, mes, ano].join("/");
  }

  public dataHojeAmericana() {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    return [ano, mes, dia].join("-");
  }

  public toDate(dateStr) {
    const parts = dateStr.split("/");

    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  public formataDataStr(dateStr) {
    const dataDia = this.datePipe.transform(dateStr, "dd/MM/yyyy");
    const parts = dataDia.split("/");
    const dia = parts[0];
    const mes = parts[1];
    const ano = parts[2];
    return ano + "-" + mes + "-" + dia;
  }

  public getDataDia(dateStr) {
    const dataDia = this.datePipe.transform(dateStr, "dd/MM/yyyy");
    const parts = dataDia.split("/");
    const dia = parts[0];
    return dia;
  }

  public getDataMes(dateStr) {
    const dataDia = this.datePipe.transform(dateStr, "dd/MM/yyyy");
    const parts = dataDia.split("/");
    const mes = parts[1];
    return mes;
  }

  public getDataAno(dateStr) {
    const dataDia = this.datePipe.transform(dateStr, "dd/MM/yyyy");
    const parts = dataDia.split("/");
    const ano = parts[2];
    return ano;
  }

  isDomingo(dataStr) {
    const diaDomingo: Date = new Date(Date.parse(dataStr));
    if (diaDomingo.getDay() === 0) {
      return true;
    } else {
      return false;
    }
  }

  isDataMaior(dataStr) {
    const diaDomingo: Date = new Date(Date.parse(dataStr));
    const dataNow = new Date();
    if (diaDomingo > dataNow) {
      return true;
    } else {
      return false;
    }
  }

  //   dias = getDateDiff('2012-12-25', new Date(), 'dias');
  //   meses = getDateDiff('2012-12-25', new Date(), 'meses');
  //   anos = getDateDiff('2012-12-25', new Date(), 'anos');

  getDateDiferenca(date1, date2, interval) {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;
    const dateone = new Date(date1).getTime();
    const datetwo = date2 ? new Date().getTime() : new Date(date2).getTime();
    const timediff = datetwo - dateone;
    const secdate = new Date(date2);
    const firdate = new Date(date1);

    if (isNaN(timediff)) {
      return NaN;
    }
    switch (interval) {
      case "anos":
        return secdate.getFullYear() - firdate.getFullYear() - 1;
      case "meses":
        return (
          secdate.getFullYear() * 12 +
          secdate.getMonth() -
          (firdate.getFullYear() * 12 + firdate.getMonth())
        );
      case "semanas":
        return Math.floor(timediff / week);
      case "dias":
        return Math.floor(timediff / day);
      case "horas":
        return Math.floor(timediff / hour);
      case "minutos":
        return Math.floor(timediff / minute);
      case "segundos":
        return Math.floor(timediff / second);
      default:
        return undefined;
    }
  }

  calculaIdade(data) {
    const hoje = new Date();

    const nascimento = new Date(data);

    //Retorna a diferença entre hoje e a data de nascimento em anos.
    var ano = hoje.getFullYear() - nascimento.getFullYear();

    //Retorna a diferença de mês do mês de nascimento para o atual.
    const m = hoje.getMonth() - nascimento.getMonth();

    //Caso ainda não tenha ultrapassado o dia e o mês
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      ano--;
    }

    this.idadeAnos = ano;
    this.idadeMeses = 12 + m;
    if (this.idadeMeses === 12) {
      this.idadeMeses = 0;
    }
    this.getAnos();
    this.getMeses();
  }
  getAnos() {
    return this.idadeAnos;
  }
  getMeses() {
    return this.idadeMeses;
  }

  //https://pt.stackoverflow.com/questions/15169/subtra%C3%A7%C3%A3o-de-datas-e-retornar-a-quantidade-de-anos-meses-e-dias
}
