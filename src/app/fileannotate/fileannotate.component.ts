import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { map, filter } from 'rxjs/operators';

import fileSaver from 'file-saver';
import * as JSZip from 'jszip';
import { concat } from 'rxjs';

import { EntityMention } from '../Entities/EntityMention';
import { RelationMention } from '../Entities/RelationMention';
import { Triplet } from '../Entities/Triplet';

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
  //currentEntityPair: string = '';
  currentEntityPair: RelationMention;
  itemNavigation = ItemNavigation;
  entityContent: string;
  relationsContent: string[] = [];
  sentencesContent: string[] = [];
  entititiesWithSentencesObject: Triplet[] = [];
  currentSentenceIndex: number;
  currentEntititiesWithSentenceObject: Triplet;

  // entities: string[] = [];
  //entityPairs: NamedEntity[] = [];
  entities: EntityMention[] = [];
  entityPairs: RelationMention[] = [];

  relationsData: string[] = [
    // "Relation 1",
    // "Relation 2",
    // "Relation 3",
    // "Relation 4",
    // "Relation 5",
  ];

  constructor(private formBuilder: FormBuilder) {
    this.relationTagFormGroup = this.formBuilder.group({
      relationTags: new FormArray([])
    });

    //this.AddRelationTagCheckBox();
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
    // if (this.entityPairs[this.entityPairIndex].relationTag != undefined) {
    //   let tags = this.entityPairs[this.entityPairIndex].relationTag;
    //   this.RelationTagsFormArray.controls.forEach((ctrl, i) => {
    //     if (tags.indexOf(this.relationsData[i]) > -1)
    //       ctrl.setValue(true);
    //     else
    //       ctrl.setValue(false);
    //   });
    // }
    // else {
    //   this.RelationTagsFormArray.controls.forEach((ctrl, i) => ctrl.setValue(false));
    // }
  }

  /*
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
  */
  AddRelationTag(): void {
    let selectedTags = this.relationTagFormGroup.value.relationTags
      .map((checked, i) => checked ? this.relationsData[i] : null)
      .filter(v => v !== null);
    // console.log(selectedTags);
    if (this.currentEntityPair.RelationName == undefined)
      this.currentEntityPair.RelationName = [];
    selectedTags.forEach((item, i) => {
      this.currentEntityPair.RelationName.push(item);
    });

  }
  CreateEntityPair(): void {
    for (let h = 0; h < this.entititiesWithSentencesObject.length; h++) {
      let currentItem = this.entititiesWithSentencesObject[h];
      this.entityPairs = [];

      for (let i = 0; i < currentItem.EntityMentions.length; i++)
        for (let j = 0; j < currentItem.EntityMentions.length; j++) {
          if (i == j)
            continue;
          let entityPair = new RelationMention();
          entityPair.Arg1Text = currentItem.EntityMentions[i].Text;
          entityPair.Arg1StartIndex = currentItem.EntityMentions[i].StartPositions[0];
          entityPair.Arg2Text = currentItem.EntityMentions[j].Text;
          entityPair.Arg2StartIndex = currentItem.EntityMentions[j].StartPositions[0];
          //  let item = `${this.entities[i]} ${this.entities[j]}`;
          this.entityPairs.push(entityPair);
        }
      this.entititiesWithSentencesObject[h].RelationMentions = [...this.entityPairs];
    }
    this.currentEntityPair = this.entititiesWithSentencesObject[0].RelationMentions[0];// this.entityPairs[0];
    this.entityPairIndex = 0;
    this.entityPairs = this.entititiesWithSentencesObject[0].RelationMentions;

  }

  /*
  CreateEntityPair_Old(): void {
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

  */

  ExtractEntity(): void {
    // this.entities = [];
    // let words = this.fileContent.split(" ");
    // words.forEach((item) => {
    //   if (this.entities.indexOf(item) < 0)
    //     this.entities.push(item);
    // });
  }

  RemoveItem(item: string): void {
    // let index = this.entities.indexOf(item);
    // if (index > -1)
    //   this.entities.splice(index, 1);
  }

  GetEntityPair(itemNav: ItemNavigation): void {
    switch (itemNav) {
      case ItemNavigation.Previous:
        if (this.entityPairIndex > 0)
          this.currentEntityPair = this.entityPairs[--this.entityPairIndex];
        this.UpdateRelationTagCheckBox();
        break;

      case ItemNavigation.Next:
        if (this.entityPairIndex < this.entityPairs.length - 1)
          this.currentEntityPair = this.entityPairs[++this.entityPairIndex];
        this.UpdateRelationTagCheckBox();
        break;

      default:
        break;
    }
  }

  ReadSentence(itemNav: ItemNavigation): void {
    switch (itemNav) {
      case ItemNavigation.Next:
        if (this.entititiesWithSentencesObject.length - 1 > this.currentSentenceIndex)
          this.currentSentenceIndex++;
        else
          this.currentSentenceIndex = 0;
        break;
      case ItemNavigation.Previous:
        if (this.currentSentenceIndex > 0)
          this.currentSentenceIndex--;
        else
          this.currentSentenceIndex = this.entititiesWithSentencesObject.length - 1;
        break;
    }
    this.currentEntititiesWithSentenceObject = this.entititiesWithSentencesObject.find(x => x['SentId'] === this.currentSentenceIndex);
    this.entityPairs = this.entititiesWithSentencesObject[this.currentSentenceIndex].RelationMentions;
    this.currentEntityPair = this.entititiesWithSentencesObject[this.currentSentenceIndex].RelationMentions[0];
  }

  ReadSelectedFile() {
    this.ReadFileContent(FileType.SentenceFile);
  }

  ReadSelectedMockFile() {
    this.ReadFileContent(FileType.EntitiesFile);
  }

  ReadSelectedRelationsFile() {
    this.ReadFileContent(FileType.RelationsFile);
  }

  RemoveOtherDataBeforeSave(): Triplet[] {
    let tempRecords = [...this.entititiesWithSentencesObject];
    let listOfEntitiesHaveRelation: string[] = [];
    tempRecords.forEach((itemS, indexS) => {
      let rms: RelationMention[] = [];
      itemS.RelationMentions.forEach((itemR, indexR) => {
        if (itemR.RelationName != undefined)
          rms.push(itemR);
      });
      itemS.RelationMentions = rms;
      let ems: EntityMention[] = [];
      itemS.EntityMentions.forEach((itemEM, indexEM) => {
        if (rms.find(x => (x.Arg1Text == itemEM.Text || x.Arg2Text == itemEM.Text)) != undefined) {
          ems.push(itemEM);
        }
      });
      itemS.EntityMentions = ems;
    });
    return tempRecords;
  }

  // save file to client side
  WriteFile() {
    // get content to save;
    let tempData = this.RemoveOtherDataBeforeSave();
    const zip = new JSZip();
    // create a file
    zip.file("triplets.json", JSON.stringify(tempData));
    let self = this;
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        // see FileSaver.js
        fileSaver.saveAs(content, self.fileName + ".zip");
      });
  }

  // save file to client side
  WriteFile_Old() {
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
  ReadFileContent(fileType: FileType) {
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      switch (fileType) {
        case FileType.SentenceFile:
          self.fileContent = (fileReader.result as string);
          break;
        case FileType.RelationsFile:
          self.relationsContent = (fileReader.result as string).split('\n');
          // console.log(self.relationsContent);
          self.relationsData = [...self.relationsContent];
          self.AddRelationTagCheckBox(); // this method is responsible to display/bind relation check boxes
          break;
        case FileType.EntitiesFile:
          self.entityContent = (fileReader.result as string);
          let obj = JSON.parse(self.entityContent, self.toPascalCase);
          obj.forEach((element, index) => {
            self.entititiesWithSentencesObject.push({ SentId: index, ...element });
          });

          if (self.entititiesWithSentencesObject.length > 0) {
            self.currentSentenceIndex = 0;
            self.currentEntititiesWithSentenceObject = self.entititiesWithSentencesObject.find(x => x.SentId === 0);
          }
          //console.log(self.currentEntititiesWithSentenceObject);
          break;
      }
      // self.fileContent = (fileReader.result as string);
    }
    fileReader.readAsText(this.selectedFile);
  }


  toCamelCase(key, value) {
    if (value && typeof value === 'object') {
      for (var k in value) {
        if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
          value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
          delete value[k];
        }
      }
    }
    return value;
  }
  toPascalCase(key, value) {
    if (value && typeof value === 'object') {
      for (var k in value) {
        if (/^[a-z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
          value[k.charAt(0).toUpperCase() + k.substring(1)] = value[k];
          delete value[k];
        }
      }
    }
    return value;
  }

}


export enum ItemNavigation {
  Previous,
  Next
}

export enum FileType {
  SentenceFile,
  EntitiesFile,
  RelationsFile
}
