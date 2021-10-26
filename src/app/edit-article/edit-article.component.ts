import { Component, OnInit } from '@angular/core';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// @ts-ignore
import * as CustomEditor from '../../ckeditor5custom/build/ckeditor';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  public Editor = CustomEditor;
  public tst = '';
  private _article : string = 'article1';
  private _edit: boolean = false;

  get edit(): boolean {
    return this._edit;
  }

  set edit(value: boolean) {
    this._edit = value;
  }

  get article(): string {
    return this._article;
  }

  set article(value: string) {
    this._article = value;
  }

  constructor() { }


  ngOnInit(): void {
  }

  public config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'alignment',
        '|',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'fontColor',
        'highlight',
        'insertTable',
        // 'mediaEmbed',
        'undo',
        'redo',
        'todoList'
      ]
    },
    language: 'ru',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:alignLeft',
        'imageStyle:alignRight'
      ],
      styles: [
        'full',
        'alignLeft',
        'alignRight'
      ]


    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    },
}
}
