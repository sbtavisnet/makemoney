import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-toobar",
  templateUrl: "./toobar.component.html",
  styleUrls: ["./toobar.component.scss"]
})
export class ToobarComponent implements OnInit {
  @Input() titulo: string;

  constructor() { }

  ngOnInit() { }
}
