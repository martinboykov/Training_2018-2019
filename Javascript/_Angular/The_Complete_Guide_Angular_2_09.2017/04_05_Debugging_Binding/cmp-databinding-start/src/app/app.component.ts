import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{ type: 'server', name: 'TestServer', content: 'Just a Test!' }];
  changeTest:string;
  constructor() {
  }

  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    // argument is coming from event binding with cokpit.component
    if (serverData.serverName !== '' || serverData.serverName !== '') {
      this.serverElements.push({
        type: 'server',
        name: serverData.serverName,
        content: serverData.serverContent
      });
    }
  }

  onBlueprintAdded(serverData: { serverName: string, serverContent: string }) {
    // argument is coming from event binding with cokpit.component
    if (serverData.serverName !== '' || serverData.serverName !== '') {
      this.serverElements.push({
        type: 'blueprint',
        name: serverData.serverName,
        content: serverData.serverContent
      });
    }
  }
  onChangeFirst(){
    this.serverElements[0].name = 'Changed!';
  }
  onChangeFirstAgain(){
    this.serverElements[0].name = 'Changed Aggain!';
  }
  method() {
    this.changeTest = 'changed'
    console.log(this.changeTest);

  }
  onDestroy(){
    this.serverElements.splice(0,1);
  }
}
