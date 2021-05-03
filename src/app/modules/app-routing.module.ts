import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { DatenschutzComponent } from '../components/datenschutz/datenschutz.component';
import { HomeComponent } from '../components/home/home.component';
import { ImpressumComponent } from '../components/impressum/impressum.component';
import { LoginComponent } from '../components/profile/login/login.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ServicesComponent } from '../components/services/services.component';
import { BlogsComponent } from '../components/blogs/blogs.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from '@service/auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'blogs', component: BlogsComponent},
  { path: 'profile', component: ProfileComponent,  canActivate: [AuthGuard],
  children: [
    // [...]
      { path:  'login',component:  LoginComponent}
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
    useHash: true,
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 218],
    onSameUrlNavigation: 'reload',
    relativeLinkResolution: 'legacy'
}
      )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
