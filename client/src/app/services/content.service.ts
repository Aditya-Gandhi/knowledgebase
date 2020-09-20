import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Content} from "../shared/model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ContentService {
  options;
  domain = this.authService.domain;

  constructor(private authService: AuthService, private http: HttpClient) {}

  createNewContent(content: Content) {
    this.authService.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authService.authToken
    });
    return this.http.post(this.domain + "content/addcontent", content, {
      headers
    });
  }

  getAllContent(): Observable<any> {
    this.authService.loadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.authService.authToken
    });
    return this.http.get(this.domain + "content/allcontent", {
      headers
    });
  }
}
