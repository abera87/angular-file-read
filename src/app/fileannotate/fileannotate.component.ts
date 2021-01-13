import { Component, OnInit } from '@angular/core';

import fileSaver from 'file-saver';
import * as JSZip from 'jszip';

@Component({
  selector: 'app-fileannotate',
  templateUrl: './fileannotate.component.html',
  styleUrls: ['./fileannotate.component.scss']
})
export class FileannotateComponent implements OnInit {


  fileName: string;
  filePath: string;
  selectedFile: File;
  fileContent: string;

  constructor() { }

  ngOnInit(): void {
  }

  onChange(fileList: FileList): void {
    let file = fileList[0];
    this.fileName = file.name;
    this.selectedFile = file;
  }

  ReadSelectedFile() {
    this.ReadFileContent();
  }



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


  ReadFileContent() {
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = (fileReader.result as string);
    }
    fileReader.readAsText(this.selectedFile);
  }

}
