import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';

const cookieConfig: NgcCookieConsentConfig =  {
  cookie: {
    domain: 'www.easy2edi.de' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#3B3B3B',
      text: '#ffffff',
      link: '#EDF8F6'
    },
    button: {
      background: '#51BAA7',
      text: '#ffffff'
    }
  },
  theme: 'classic',
  position: 'bottom',
  type: 'opt-out'
  ,
  content:{

    href: 'https://easy2edi.de/datenschutz',
  }
};

@NgModule({
  declarations: [],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConfig),
    CommonModule
  ],
  exports: [NgcCookieConsentModule]
})
export class CookieModule { }
