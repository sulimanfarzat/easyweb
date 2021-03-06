import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcCookieConsentConfig, NgcCookieConsentModule } from 'ngx-cookieconsent';
import { TranslateModule } from '@ngx-translate/core';

const cookieConfig: NgcCookieConsentConfig =  {
  cookie: {
    domain: 'easy2edi.de' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
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
  content: {

    href: 'https://easy2edi.de/datenschutz',
  }
};

@NgModule({
  declarations: [],
  imports: [
    TranslateModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    CommonModule
  ],
  exports: [NgcCookieConsentModule, TranslateModule]
})
export class CookieModule { }
