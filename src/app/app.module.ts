import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


// Awesome
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// angular/fire 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// services
import { CmspageService } from '@service/cmspage.service';
import { LangService } from '@service/lang.service';
import { AuthService } from '@service/auth/auth.service';
import { AuthGuard } from '@service/auth/auth.guard';
import { ServiceWorkerModule } from '@angular/service-worker';

// components
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SafePipe, ServicesComponent } from './components/services/services.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { DatenschutzComponent } from './components/datenschutz/datenschutz.component';
import { CookieModule } from './modules/cookie.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './components/profile/login/login.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ProfileComponent } from './components/profile/profile.component';




@NgModule({ 
  declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ServicesComponent,
        ProjectsComponent,
        AboutComponent,
        ContactComponent,
        TestimonialsComponent,
        ImpressumComponent,
        DatenschutzComponent,
        SafePipe,
        NotfoundComponent,
        LoginComponent,
        BlogsComponent,
        ProfileComponent
    ],
    exports: [TranslateModule],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        NgbModule,
        BrowserAnimationsModule,
        CarouselModule,
        FontAwesomeModule,
        NgSelectModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        }),
        CookieModule,
        ReactiveFormsModule,
        NgBootstrapFormValidationModule.forRoot(),
        NgBootstrapFormValidationModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        // 3. Initialize
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AngularFireStorageModule // storage
    ], 
    providers: [Title, HttpClient, HttpClientModule, CmspageService, LangService, AuthService, AuthGuard, provideHttpClient(withInterceptorsFromDi())] 
  }
)


export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient):any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
