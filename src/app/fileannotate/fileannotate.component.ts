import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { map, filter } from 'rxjs/operators';

import fileSaver from 'file-saver';
import * as JSZip from 'jszip';
import { NamedEntity } from '../Entities/NamedEntity';

@Component({
  selector: 'app-fileannotate',
  templateUrl: './fileannotate.component.html',
  styleUrls: ['./fileannotate.component.scss']
})
export class FileannotateComponent implements OnInit {

  relationTagFormGroup: FormGroup;

  fileName: string;
  filePath: string;
  selectedFile: File;
  fileContent: string;
  entityPairIndex: number = 0;
  currentEntityPair: string = '';
  itemNavigation = ItemNavigation;

  entities: string[] = [];
  entityPairs: NamedEntity[] = [];

  relationsData: string[] = [
    "Relation 1",
    "Relation 2",
    "Relation 3",
    "Relation 4",
    "Relation 5",
  ];

  constructor(private formBuilder: FormBuilder) {
    this.relationTagFormGroup = this.formBuilder.group({
      relationTags: new FormArray([])
    });

    this.AddRelationTagCheckBox();
  }

  ngOnInit(): void {

  }

  onChange(fileList: FileList): void {
    let file = fileList[0];
    this.fileName = file.name;
    this.selectedFile = file;
  }

  onSelect(event: any): void {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    let selectedText = event.target.value.substr(start, end - start);
    //deselect once get the text
    event.target.selectionStart = event.target.selectionEnd;
    // console.log(selectedText);
    if (selectedText.length > 0 && this.entities.indexOf(selectedText) < 0)
      this.entities.push(selectedText);
    selectedText = '';
  }

  get RelationTagsFormArray() {
    return this.relationTagFormGroup.controls.relationTags as FormArray;
  }

  private AddRelationTagCheckBox(): void {
    this.relationsData.forEach(() => this.RelationTagsFormArray.push(new FormControl(false)));
    // to add validation function
    // this.RelationTagsFormArray.setValidators(this.minSelectedCheckboxes(1));
  }

  /*
  this is to add validator function on check box
  // validation function for tags checkbox
  minSelectedCheckboxes(min = 1):ValidatorFn {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }

  */

  // update tags on click of previous and next in entity pair
  UpdateRelationTagCheckBox(): void {
    if (this.entityPairs[this.entityPairIndex].relationTag != undefined) {
      let tags = this.entityPairs[this.entityPairIndex].relationTag;
      this.RelationTagsFormArray.controls.forEach((ctrl, i) => {
        if (tags.indexOf(this.relationsData[i]) > -1)
          ctrl.setValue(true);
        else
          ctrl.setValue(false);
      });
    }
    else {
      this.RelationTagsFormArray.controls.forEach((ctrl, i) => ctrl.setValue(false));
    }
  }

  AddRelationTag(): void {
    let selectedTags = this.relationTagFormGroup.value.relationTags
      .map((checked, i) => checked ? this.relationsData[i] : null)
      .filter(v => v !== null);
    // console.log(selectedTags);
    // if (this.entityPairs[this.entityPairIndex].relationTag == undefined)
    this.entityPairs[this.entityPairIndex].relationTag = [];
    selectedTags.forEach((item, i) => {
      this.entityPairs[this.entityPairIndex].relationTag.push(item);
    });
  }

  CreateEntityPair(): void {
    this.entityPairs = [];
    for (let i = 0; i < this.entities.length; i++)
      for (let j = 0; j < this.entities.length; j++) {
        if (i == j)
          continue;
        let item = `${this.entities[i]} ${this.entities[j]}`;
        this.entityPairs.push(new NamedEntity(item));
      }

    this.currentEntityPair = this.entityPairs[0].entityPair;
    this.entityPairIndex = 0;
  }

  ExtractEntity(): void {
    this.entities = [];
    let words = this.fileContent.split(" ");
    words.forEach((item) => {
      if (this.entities.indexOf(item) < 0)
        this.entities.push(item);
    });
  }

  RemoveItem(item: string): void {
    let index = this.entities.indexOf(item);
    if (index > -1)
      this.entities.splice(index, 1);
  }

  GetEntityPair(itemNav: ItemNavigation): void {
    switch (itemNav) {
      case ItemNavigation.Previous:
        if (this.entityPairIndex > 0)
          this.currentEntityPair = this.entityPairs[--this.entityPairIndex].entityPair;
        this.UpdateRelationTagCheckBox();
        break;

      case ItemNavigation.Next:
        if (this.entityPairIndex < this.entityPairs.length - 1)
          this.currentEntityPair = this.entityPairs[++this.entityPairIndex].entityPair;
        this.UpdateRelationTagCheckBox();
        break;

      default:
        break;
    }
  }

  ReadSelectedFile() {
    this.ReadFileContent();
  }

  // save file to client side
  WriteFile() {
    const zip = new JSZip();
    // create a file
    zip.file(this.fileName, this.fileContent);
    let self = this;
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        // see FileSaver.js
        fileSaver.saveAs(content, self.fileName + ".zip");
      });
  }

  //read client selected file content
  ReadFileContent() {
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = (fileReader.result as string);
    }
    fileReader.readAsText(this.selectedFile);
  }

}

export enum ItemNavigation {
  Previous,
  Next
}
