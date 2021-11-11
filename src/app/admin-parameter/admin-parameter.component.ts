import {Component, OnInit} from '@angular/core';
import {ParameterService} from "../service/parameter.service";
import {ParameterObject} from "../../site-object/parameter-object";
import {Observable} from "rxjs";
import {DataSingleObject} from "../../site-object/data-object";

@Component({
  selector: 'app-admin-parameter',
  templateUrl: './admin-parameter.component.html',
  styleUrls: ['./admin-parameter.component.css']
})
export class AdminParameterComponent implements OnInit {

  private _listParameter: ParameterObject[] = [];

  get listParameter(): ParameterObject[] {
    return this._listParameter;
  }

  set listParameter(value: ParameterObject[]) {
    this._listParameter = value;
  }

  constructor(private parameterService: ParameterService) {
  }

  ngOnInit(): void {
    this.getListParameter();
  }


  getListParameter(): void {
    this.parameterService.getParameters().subscribe(data => {
      data.result.forEach(item => {
        this.listParameter.push({
          id: item.id,
          name: item.name,
          code: item.code,
          value: item.value
        });
      });
    }, error => {
      console.log(error);
    });
  }

  getParameter(idParameter: number, index: number) {
    this.parameterService.getParameter(idParameter).subscribe(dara => {
      this.listParameter[index] = dara.result;
    }, error => {
      console.log(error);
    });
  }

  updateParameter(index: number): void {
    const body = this.listParameter[index];
    this.parameterService.updateParameter(body).subscribe(() => {
    }, error => {
      console.log(error)
      this.parameterService.getParameter(body.id).subscribe(dara => {
        this.listParameter[index] = dara.result;
      }, error => {
        console.log(error);
      });
    });
  }
}
