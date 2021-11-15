import {Component, OnInit} from '@angular/core';
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {FileService} from "../service/file.service";
import {DestinationObject, FileObject, SelectedFileObject} from "../../site-object/file-object";
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-file-edit',
  templateUrl: './admin-file-edit.component.html',
  styleUrls: ['./admin-file-edit.component.css']
})
export class AdminFileEditComponent implements OnInit {

  selectedFiles?: FileList | null = null;
  selectedFile: SelectedFileObject[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  private _listFiles: FileObject[] = [];
  private _idFile: number | null = null;
  private _typeFile: string | null = null;
  private _listDestination: DestinationObject[] = [];
  private _close: boolean = false;
  edit: boolean = false;
  previewImg1: string = 'assets/icons/layout.svg';
  previewImg2: string = 'assets/icons/x.svg';


  get close(): boolean {
    return this._close;
  }

  set close(value: boolean) {
    this._close = value;
  }

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

  get listDestination(): DestinationObject[] {
    return this._listDestination;
  }

  set listDestination(value: DestinationObject[]) {
    this._listDestination = value;
  }

  constructor(private fileService: FileService) {
  }


  ngOnInit(): void {
    this.getFileTypesDestionation();
    this.getListfiles();
  }

  getListfiles(): void {
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    this.fileService.getFiles(idBranch).subscribe(data => {
      console.log(data);
      data.result.forEach(file => this.listFiles.push({
          id: file.id,
          nameFile: file.nameFile,
          typeFile: file.typeFile,
          createdDate: file.createdDate,
          destination: {
            idTypeDestination: file.destination.idTypeDestination,
            nameDestination: file.destination.nameDestination,
            codeDestination: file.destination.codeDestination,
            description: file.destination.description
          }
        })
      );
      // this.listFiles = data.result;
      console.log(this._listFiles)
    })
  }

  getFileTypesDestionation(): void {
    this.fileService.getTypesDestination().subscribe(data => {
      data.result.forEach(destination => this.listDestination.push({
        idTypeDestination: destination.idTypeDestination,
        nameDestination: destination.nameDestination,
        codeDestination: destination.codeDestination,
        description: destination.description
      }));
    })
  }

  selectFiles(event: Event): void {
    this.message = [];
    this.progressInfos = [];
    const files = (event.target as HTMLInputElement).files;
    // this.selectedFiles = (event.target as HTMLInputElement).files;
    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFile.push({
          file: files.item(i)!,
          destination: this.listDestination[0]
        });
      }
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFile) {
      for (let i = 0; i < this.selectedFile.length; i++) {
        this.upload(i, this.selectedFile[i]);
      }
    }
  }

  upload(idx: number, selectFile: SelectedFileObject): void {
    this.progressInfos[idx] = {value: 0, fileName: selectFile.file.name};
    const idBranch = JSON.parse(localStorage.getItem('user')!).libraryBranch.id;
    if (selectFile.file) {
      this.fileService.uploadFile(selectFile, idBranch).subscribe(
        (event: any) => {
          console.log(event instanceof HttpResponse)
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);

          } else if (event instanceof HttpResponse) {
            const msg = 'Файл успешно загружен: ' + selectFile.file.name;
            const result = event.body.result;
            this.listFiles.unshift({
              id: result.id,
              nameFile: result.nameFile,
              typeFile: result.typeFile,
              createdDate: result.createdDate,
              destination: {
                idTypeDestination: result.destination.idTypeDestination,
                nameDestination: result.destination.nameDestination,
                codeDestination: result.destination.codeDestination,
                description: result.destination.description
              }
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
          const msg = 'Не удалось загрузить файл: ' + selectFile.file.name;
          this.message.push(msg);
          // this.fileInfos = this.fileService.getFiles();
        });
    }
  }

  // setTypeDestination(e: number, file: FileObject): void {
  //   this._listDestination.forEach((value, index, array) => {
  //     if (e === value.idTypeDestination) {
  //
  //     }
  //   });
  //   // file.destination = this.listDestination.filter(type => type.idTypeDestination === e)[0];
  //   // console.log(this.listFiles[index].destination);
  //   // this.listDestination.forEach((value, index, array) => {
  //   //   if (e === value.idTypeDestination) {
  //   //     file.destination = value;
  //   //     console.log(file)
  //   //     console.log(e)
  //   //   }
  //   // })
  // }

  // saveNewTypeDestinationFile(viewFile: FileObject): void {
  //   this.fileService.changeTypesDestination(viewFile).subscribe(data => {
  //     viewFile = data.result;
  //   }, error => {
  //     this.fileService.getSingleFile(viewFile.id).subscribe(data => {
  //       // viewFile.
  //     }, error => {
  //       console.log(error);
  //     });
  //     console.log(error);
  //   });
  // }


  deleteFile(id: number, index: number): void {
    this.edit = true;
    this.fileService.deleteFile(id).subscribe(data => {
      this.listFiles.splice(index, 1);
      this.edit = false;
    }, error => {
      this.edit = false;
      console.log(error);
    })
  }

  previewImage(): string | undefined {
    const regex = /image\/.*/;
    if (this.typeFile?.match(regex)) {
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
    if (this.idFile !== null && this.idFile === id) {
      this.idFile = null;
      return
    }
    this.idFile = id;
    this.typeFile = type;
    if (type === "application/pdf") {
      this.previewPDF();
    }
  }

  log(): void {
    console.log(this.selectedFile);
    console.log(this._listDestination);
    console.log(this.listFiles);
  }

  closePopup() {
    this.selectedFile = [];
    this.message = [];
    this.progressInfos = [];
    this.close = false
  }
}
