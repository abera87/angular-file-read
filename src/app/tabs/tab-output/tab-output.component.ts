import { Component, OnInit, ViewChild } from '@angular/core';
import { Triplet } from 'src/app/Entities/Triplet';
import { TripletsService } from 'src/app/services/triplets.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-tab-output',
  templateUrl: './tab-output.component.html',
  styleUrls: ['./tab-output.component.scss']
})
export class TabOutputComponent implements OnInit {

  entititiesWithSentencesObject: Triplet[];
  options = new JsonEditorOptions();
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor(private tripletSrv: TripletsService) {
    this.options.mode = 'text';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    //this.options.schema = schema;
    this.options.statusBar = false;
    this.options.onChange = () => console.log(this.editor.get());
   }

  ngOnInit(): void {
    this.entititiesWithSentencesObject = this.tripletSrv.GetTripletsData();
  }
  GetTripletsAsString(){
    return JSON.stringify(this.entititiesWithSentencesObject,null,4);
  }

}