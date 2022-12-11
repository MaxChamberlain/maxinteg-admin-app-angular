

import {InjectionToken} from '@angular/core';

export const ENV = new InjectionToken<string>('env', {
  providedIn: 'root',
  factory: () => {
    //Here you can access the Netlify environment variables
    const envVars = {
      API_URL: process.env['API_URL'],
      SOCKET_URL: process.env['SOCKET_URL']
    };
    return JSON.stringify(envVars);
  }
});