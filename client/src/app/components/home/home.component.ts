import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  username: string = 'User';
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.username = (this.authService.user && this.authService.user.username) || 'User';
  }
}
