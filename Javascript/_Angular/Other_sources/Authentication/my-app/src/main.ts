// import { enableProdMode } from '@angular/core'; // може да го махнем
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { environment } from './environments/environment'; // може да го махнем

// if (environment.production) { // може да го махнем --> отиваме в environment и сетваме на true
//   enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule);
