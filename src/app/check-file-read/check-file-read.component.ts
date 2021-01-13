import { Component, OnInit } from '@angular/core';
import  fileSaver from 'file-saver';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-check-file-read',
  templateUrl: './check-file-read.component.html',
  styleUrls: ['./check-file-read.component.scss']
})
export class CheckFileReadComponent implements OnInit {

  fileContent: string='';
  fileName:string;
  constructor() { }

  ngOnInit(): void {
  }

  onChange(fileList:FileList): void {
    let file = fileList[0];
    this.fileName=file.name;
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = (fileReader.result as string);
    }
    fileReader.readAsText(file);
  }

  SaveFile_Download(){
    const zip = new JSZip();
// create a file
zip.file(this.fileName, this.fileContent);
let self=this;
zip.generateAsync({type:"blob"})
      .then(function(content) {
        // see FileSaver.js
         fileSaver.saveAs(content, self.fileName+".zip");
    });
    /*
    sample code

    const zip = new JSZip.default();
    // create a file
    zip.file("Hello.txt", "Hello World\n");
    // create a file and a folder
    zip.file("nested/hello.txt", "Hello World\n");
    zip.generateAsync({type:"blob"})
      .then(function(content) {
        // see FileSaver.js
         fileSaver.saveAs(content, "example.zip");
    });

    */
  }

}
