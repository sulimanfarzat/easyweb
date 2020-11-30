import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { DatenschutzComponent } from '../components/datenschutz/datenschutz.component';
import { HomeComponent } from '../components/home/home.component';
import { ImpressumComponent } from '../components/impressum/impressum.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ServicesComponent } from '../components/services/services.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    relativeLinkResolution: 'legacy'
}
      )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
