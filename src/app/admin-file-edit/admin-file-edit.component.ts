import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from "@angular/common/http";
import {FileService} from "../service/file.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-file-edit',
  templateUrl: './admin-file-edit.component.html',
  styleUrls: ['./admin-file-edit.component.css']
})
export class AdminFileEditComponent implements OnInit {

  selectedFiles?: FileList | null = null;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  fileToUpload: File | null = null;
  handleError: string = "";

  f: any = null

  cardImageBase64: string | ArrayBuffer | null = null;
  returnI: string | ArrayBuffer | null = null;

  constructor(private httpClient: HttpClient, private fileService: FileService) {
  }


  ngOnInit(): void {
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
      this.fileService.upload(file).subscribe(
        (event: any) => {
          console.log(event instanceof HttpResponse)
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);

          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
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

  test(idx: number, file: File): void {
    const url = `/api/files/saveiamge`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('type', file.type);
    formData.append('size', file.size.toString());
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      // responseType: 'json'
    });
    this.httpClient.request(req).subscribe(date => {
      console.log(date)
    });
  }

  img() {
    this.httpClient.get<any>(`/api/files/image`).subscribe(d => {
      this.cardImageBase64 = "data:image/jpeg;base64," + d.data;
    })
  }
}
