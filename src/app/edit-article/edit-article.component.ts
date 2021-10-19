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
        'mediaEmbed',
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
        'imageStyle:side'
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
