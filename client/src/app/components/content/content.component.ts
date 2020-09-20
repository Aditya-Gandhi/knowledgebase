import { Component, OnInit } from '@angular/core';
import {Category, Content} from "../../shared/model";
import {ContentService} from "../../services/content.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  contents: Content[];
  fileToUpload: File = null;
  title: string = '';
  body: string = '';
  categories: Category[] = [{
    _id: "1234567",
    name: "NodeJs"
  }];
  selectedCategory: Category;
  constructor(
    private contentService: ContentService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getAllContents();
  }


  getAllContents() {
    this.contentService.getAllContent().subscribe((data: any[]) => {
      this.contents = (data as any).content;
    });
  }

  addNewContent(title, body, categoryId) {
    let newContent: Content = {
      title: title,
      body: body,
      category: categoryId,
      attachment: this.fileToUpload
    }
    this.contentService.createNewContent(newContent).subscribe(data => {
      alert("New blog has been saved");
      // this.title = "";
      // this.content = "";
      this.getAllContents();
    });
  }

  onFileInput(file: File) {
    this.fileToUpload = file;
  }
}
