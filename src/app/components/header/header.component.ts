import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isMenuCollapsed = true;
  selectLang: string = null;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
    this.selectLang = (browserLang.match(/en|de/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }



}
