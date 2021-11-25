import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, EMPTY } from "rxjs";


@Injectable({
  providedIn: "root"
})

export class ErrorService {
  constructor(private snackBar: MatSnackBar) { }


  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro: ' + e);
    return EMPTY;
  }

  private showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['msg-error'],
      //panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }


}
