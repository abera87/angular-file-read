import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fileannotate2',
  templateUrl: './fileannotate2.component.html',
  styleUrls: ['./fileannotate2.component.scss']
})
export class Fileannotate2Component implements OnInit {
TabType=TabType;
selectedTab:TabType;
  constructor() { }

  ngOnInit(): void {
    this.selectedTab=TabType.Sentence;
  }

}

export enum TabType{
  Sentence,
  Relation,
  AddRelation,
  Output
}
