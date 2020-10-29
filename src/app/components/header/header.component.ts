import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isMenuCollapsed = true;
  y = window.scrollY;
  myID = document.getElementById("header");
  //myID2 = document.getElementById("header2");

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }



  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
          if (this.y >= 150) {
          //this.myID2.className = "background-header"
          this.myID.className = "background-header";
        } else {
          //this.myID2.className = "bottomMenu show"
          this.myID.className = "background-header";
        }
}



}
