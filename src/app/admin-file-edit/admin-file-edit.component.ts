import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileService} from "../service/file.service";

@Component({
  selector: 'app-admin-file-edit',
  templateUrl: './admin-file-edit.component.html',
  styleUrls: ['./admin-file-edit.component.css']
})
export class AdminFileEditComponent implements OnInit {

  fileToUpload: File | null = null;
  handleError:string = "";

  cardImageBase64: string | ArrayBuffer | null  = null;

  constructor(private httpClient : HttpClient, private fileService: FileService) { }

  ngOnInit(): void {
  }

  getLog(e: EventTarget| null){;
    console.log((e as HTMLInputElement).files![0]);
    const file =  (e as HTMLInputElement).files![0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      this.cardImageBase64 = reader.result;
    };
    // const formData = new FormData();
    // formData.append("thumbnail", file);
    // console.log(formData);
  }

  getList(){
    this.fileService.getFiles().subscribe(data => {console.log(data)},error => {console.log(error)})
  }

  test(){}
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.postFile(this.fileToUpload!);
  }

  postFile(fileToUpload: File) {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    this.httpClient.post(endpoint, formData).subscribe(data => console.log(data));
  }

}
