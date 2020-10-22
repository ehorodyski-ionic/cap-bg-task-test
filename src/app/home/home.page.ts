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
  messages = [];
  pendingRequest: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // App.addListener("appStateChange", (state) => {
    //   if (!state.isActive && this.pendingRequest) {
    //     let taskId = BackgroundTask.beforeExit(() => {
    //       this.data.subscribe((data) =>
    //         console.log(`E/ ${data} - ${new Date(Date.now()).getTime()}`)
    //       );
    //       BackgroundTask.finish({ taskId });
    //     });
    //   }
    // });
  }

  sendMessage() {
    console.log(`E/`);
    this.pendingRequest = true;
    this.http
      .get<any>(
        "http://slowwly.robertomurray.co.uk/delay/10000/url/https://jsonplaceholder.typicode.com/posts"
      )
      .subscribe((data) => {
        //this.pendingRequest = false;

        for (let message of data) {
          this.messages.push({ status: message.id, message: message.title });
        }
      });
  }
}

//
