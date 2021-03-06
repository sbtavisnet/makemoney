import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();

  constructor() {


  }

  ngOnInit(): void {
  }

  submit() {

    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }

  }


}
