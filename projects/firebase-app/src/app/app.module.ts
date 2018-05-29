import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

import { AngularFireModule, FirebaseOptionsToken, FirebaseNameOrConfigToken } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { ConfigService } from './firebase-config.service';

export function initConfig(configService: ConfigService) {
  return () => configService.loadConfiguration().toPromise();
}

export function configureFirebase(configService: ConfigService) {
  return configService.getConfig().firebase;
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpModule, AngularFireAuthModule],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: FirebaseOptionsToken,
      useFactory: configureFirebase,
      deps: [ConfigService],
    },
    {
      provide: FirebaseNameOrConfigToken,
      useValue: 'firebase-demo-ng',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
