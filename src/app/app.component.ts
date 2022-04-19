import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import * as firebase from 'firebase'; 
import { environment } from 'src/environments/environment'; 

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed, StatusBarStyle
} from '@capacitor/core';

const { SplashScreen, StatusBar, PushNotifications, LocalNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private platform: Platform,
    ) { 
      
    await PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      this.authentificationService.localFCMToken = token.value;
      console.log(" ################### Firebase token = ", this.authentificationService.localFCMToken, " #################################");
    });
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        let notif = notification.notification.data;
        this.fromNotification = true;
        console.log(" ################### Firebase token = ", this.authentificationService.localFCMToken, " #################################");
        if (notif.consultationId != null && notif.consultationId != undefined) {
          var consultationId = notif.consultationId;
          // alert("ConsultationId = "+ consultationId);
          await this.consultationService.getConsultationById(consultationId);
          console.log("Consultation object : ", this.consultationService.selectedConsultation);

          if (this.consultationService.selectedConsultation.status == 4) {
            await this.userWorkspaceService.getUserWorkspaceByProviderId(this.userService.user.userId);
            console.log("UserWorkspace Object : ", this.userWorkspaceService.userWorkspace);
            this.navCntrl.navigateRoot(['new-consultation']);
          }
          else {
            await this.getUserNotifications();
            this.navCntrl.navigateRoot('/notifications');
          }

        }
      }
    );

    firebase.initializeApp(environment.firebaseConfig);     
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
    });
  }


}
