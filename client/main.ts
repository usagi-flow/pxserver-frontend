import { enableProdMode, PlatformRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import "./styles.scss";

if (environment.production) {
  enableProdMode();
}

let platform : PlatformRef = platformBrowserDynamic();

platform.bootstrapModule(AppModule).catch(err => console.error(err));