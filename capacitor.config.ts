import { CapacitorConfig } from '@capacitor/cli';
/// <reference types="@capacitor/local-notifications" /> 

const config: CapacitorConfig = {
  appId: 'smpnt.com.ecommerce',
  appName: 'gesionEmployee',
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    "CapacitorFirebaseAuth": {
      "providers": ["phone"],
      "languageCode": "en",
      "nativeAuth": false,
      "permissions": {},
      "LocalNotifications": {
        "smallIcon": "ic_stat_icon_config_sample",
        "iconColor": "#488AFF",
        "sound": "beep.wav",
      },
    },
    PushNotifications :{
      presentationOptions : ["badge", "sound", "alert"]
    }
  }
}; 

export default config; 