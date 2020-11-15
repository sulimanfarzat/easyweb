import { Component,  OnInit, OnDestroy, Inject, PLATFORM_ID, ViewChild, ElementRef  } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NgcCookieConsentService, NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class HeaderComponent implements OnInit, OnDestroy {

  public isMenuCollapsed = true;
  selectLang: string = null;

  @ViewChild("content") contentMsgCookies: ElementRef;
  contentMsgAblehnen: string;

   //keep refs to subscriptions to be able to unsubscribe later
   private popupOpenSubscription: Subscription;
   private popupCloseSubscription: Subscription;
   private initializeSubscription: Subscription;
   private statusChangeSubscription: Subscription;
   private revokeChoiceSubscription: Subscription;
   private noCookieLawSubscription: Subscription;


  constructor(public translate: TranslateService,
    private ccService: NgcCookieConsentService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
      this.router.events.pipe(
        filter((event:RouterEvent) => event instanceof NavigationEnd)
      ).subscribe(event => {
        if (isPlatformBrowser(this.platformId)) {
          window.scroll(0, 0);
        }
      });

    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
    this.selectLang = (browserLang.match(/en|de/) ? browserLang : 'en');

    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
  }

  ngOnInit(): void {
    this.cookieMsg();
  }

  ngOnDestroy(): void {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
 }


  switchLang(lang: string) {
    this.translate.use(lang);
    this.cookieMsg();
  }


  cookieMsg(){

      // subscribe to cookieconsent observables to react to main events
      this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
        () => {
          // you can use this.ccService.getConfig() to do stuff...
          console.log('popupOpen');
        });

      this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
        () => {
          // you can use this.ccService.getConfig() to do stuff...
          console.log('popuClose');
        });

      this.initializeSubscription = this.ccService.initialize$.subscribe(
        (event: NgcInitializeEvent) => {
          // you can use this.ccService.getConfig() to do stuff...
          console.log(`initialize: ${JSON.stringify(event)}`);
        });

      this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
        (event: NgcStatusChangeEvent) => {
          // you can use this.ccService.getConfig() to do stuff...
          console.log(`statusChange: ${JSON.stringify(event.status)}`);
          if (event.status === "deny") {
            this.contentMsgAblehnen = JSON.stringify(event);
            this.modalService.open(this.contentMsgCookies);
          }

        });

      this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
        () => {
          // you can use this.ccService.getConfig() to do stuff...
          console.log(`revokeChoice`);
        });

      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
        (event: NgcNoCookieLawEvent) => {
          // you can use this.ccService.getConfig() to do stuff...
          console.log(`noCookieLaw: ${JSON.stringify(event)}`);
        });


      // (Optional) support for translated cookies messages
      //this.translate.addLangs(['en', 'de']);
      //this.translate.setDefaultLang('en');

      //const browserLang = this.translate.getBrowserLang();
     // this.translate.use(browserLang.match(/en|de/) ? browserLang : 'en');

     this.translate//
        .get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy'])
        .subscribe(data => {

          this.ccService.getConfig().content = this.ccService.getConfig().content || {} ;
          // Override default messages with the translated ones
          this.ccService.getConfig().content.header = data['cookie.header'];
          this.ccService.getConfig().content.message = data['cookie.message'];
          this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
          this.ccService.getConfig().content.allow = data['cookie.allow'];
          this.ccService.getConfig().content.deny = data['cookie.deny'];
          this.ccService.getConfig().content.link = data['cookie.link'];
          this.ccService.getConfig().content.policy = data['cookie.policy'];

          this.ccService.destroy();//remove previous cookie bar (with default messages)
          this.ccService.init(this.ccService.getConfig()); // update config with translated messages
        });

  }



}
