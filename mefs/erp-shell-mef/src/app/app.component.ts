import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'erp-shell-mef';

  //Shell microfrontend
  sendNotification() {
    const event = new CustomEvent('product_mef_delete_event', {
      detail: {
        name: "Product 1",
      }
    });
    window.dispatchEvent(event);
  }
}
