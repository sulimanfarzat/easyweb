import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  public selectLang: string = null;

  constructor(public translate: TranslateService) {

    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
    this.selectLang = (browserLang.match(/en|de/) ? browserLang : 'en');

  }


}
