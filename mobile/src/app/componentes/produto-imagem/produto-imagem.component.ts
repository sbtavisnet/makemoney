import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-imagem',
  templateUrl: './produto-imagem.component.html',
  styleUrls: ['./produto-imagem.component.scss'],
})
export class ProdutoImagemComponent implements OnInit {

  @Input() imagem: string;

  constructor() { }

  ngOnInit() { }

  isImage(): boolean {
    if (this.imagem != undefined && this.imagem.length > 0)
      return true;
    else return false;
  }


}
