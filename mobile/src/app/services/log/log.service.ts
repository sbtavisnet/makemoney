import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ModelLog } from 'src/app/classes/model.log';
import { API_CONFIG } from 'src/app/config/api.config';


@Injectable({
  providedIn: 'root'
})

export class LogService {
  //  private configUris: ConfigUris = new ConfigUris();
  private configUris: any;

  constructor(public http: HttpClient) { }

  save(modelLog: ModelLog) {
    const idcliente = modelLog.idcliente.toString();
    let urimei = this.configUris.uriLog(idcliente);

    //let body: string = "&data=" + JSON.stringify(modelMEI);

    const obj: string = JSON.stringify(modelLog);
    // encode a string
    const encodedData = window.btoa(obj); // encode a string

    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    urimei = urimei + '&data=' + encodedData;
    this.http.post(urimei, null, { headers }).subscribe(res => {

    }),
      error => {
        console.log(error);
      };
  }


}
