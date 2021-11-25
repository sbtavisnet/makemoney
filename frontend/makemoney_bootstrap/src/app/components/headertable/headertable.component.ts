import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-headertable',
  templateUrl: './headertable.component.html',
  styleUrls: ['./headertable.component.css']
})
export class HeadertableComponent implements OnInit {

  @Input() titulo: '';
  @Input() lista: Array<any>;

  constructor() { }

  ngOnInit(): void {
    console.log('headertable: ' + this.lista);

  }

}
