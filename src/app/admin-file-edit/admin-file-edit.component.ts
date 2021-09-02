import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {FileService} from "../service/file.service";
import {FileObject} from "../../site-object/file-object";
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-file-edit',
  templateUrl: './admin-file-edit.component.html',
  styleUrls: ['./admin-file-edit.component.css']
})
export class AdminFileEditComponent implements OnInit {

  selectedFiles?: FileList | null = null;
  progressInfos: any[] = [];
  message: string[] = [];
  private _listFiles: FileObject[] = [];
  private _idFile: number | null = null;
  private _typeFile: string | null = null;

  get listFiles(): FileObject[] {
    return this._listFiles;
  }

  set listFiles(value: FileObject[]) {
    this._listFiles = value;
  }


  get idFile(): number | null {
    return this._idFile;
  }

  set idFile(value: number | null) {
    this._idFile = value;
  }

  get typeFile(): string | null {
    return this._typeFile;
  }

  set typeFile(value: string | null) {
    this._typeFile = value;
  }

  constructor(private httpClient: HttpClient, private fileService: FileService) {
  }


  ngOnInit(): void {
    this.getListfiles();
  }

  getListfiles(): void {
    this.fileService.getFiles().subscribe(data => {
      console.log(data);
      data.result.forEach(file => this.listFiles.push({
          id: file.id,
          nameFile: file.nameFile,
          typeFile: file.typeFile,
          createdDate: file.createdDate
        })
      );
      // this.listFiles = data.result;
      console.log(this._listFiles)
    })
  }

  selectFiles(event: Event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = (event.target as HTMLInputElement).files;
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = {value: 0, fileName: file.name};

    if (file) {
      this.fileService.uploadFile(file).subscribe(
        (event: any) => {
          console.log(event instanceof HttpResponse)
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);

          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.listFiles.unshift({
              id: event.body.result.id,
              nameFile: event.body.result.nameFile,
              typeFile: event.body.resulttypeFile,
              createdDate: event.body.result.createdDate
            })
            // this.listFiles = [];
            // this.getListfiles();
            console.log(event.body.result)
            this.message.push(msg);

            // this.fileInfos = this.fileService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          // this.fileInfos = this.fileService.getFiles();
        });
    }
  }

  deleteFile(id: number, index: number): void {
    this.fileService.deleteFile(id).subscribe(data => {
      this.listFiles.splice(index, 1);
    }, error => {
      console.log(error);
    })
  }

  previewImage(): string | undefined {
    const regex1 = /image\/.*/;
    if (this.typeFile?.match(regex1)) {
      if (this.idFile !== null) {
        const url = `/api/files/get/${this.idFile}`;
        return url;
      }
    }
    return
  }

  previewPDF() {
    const url = `/api/files/get/${this.idFile}`;
    window.open(url);
  }

  setIdAndTypeFile(id: number, type: string): void {
    this.idFile = id;
    this.typeFile = type;
    if (type === "application/pdf") {
      this.previewPDF();
    }
  }
}
