import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Plugins } from "@capacitor/core";
import { delay, map } from "rxjs/operators";
import { Observable, of } from "rxjs";

const { App, BackgroundTask } = Plugins;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  data: Observable<string> = of("");
  pendingRequest: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.sendMessage();
    App.addListener("appStateChange", (state) => {
      if (!state.isActive && this.pendingRequest) {
        let taskId = BackgroundTask.beforeExit(() => {
          this.data.subscribe((data) =>
            console.log(`E/ ${data} - ${new Date(Date.now()).getTime()}`)
          );
          BackgroundTask.finish({ taskId });
        });
      }
    });
  }

  sendMessage() {
    this.pendingRequest = true;
    this.data = this.http
      .get<any>("http://dummy.restapiexample.com/api/v1/employees")
      .pipe(
        delay(5000),
        map((data) => {
          this.pendingRequest = true;
          return data.status;
        })
      );
  }
}
