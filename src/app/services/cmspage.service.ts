import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../components/contact/cmspage.module';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContactComponent } from '../components/contact/contact.component';


@Injectable({
  providedIn: 'root'
})
export class CmspageService {

  ServerUrl = 'https://farzat.co/farzat/email/easy2edi/';
  errorData: {};

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
   // responseType: 'text'
  };


  constructor(private http: HttpClient) { }

  getPage(slug: string) {
    return this.http.get<ContactComponent>(this.ServerUrl + 'send_mail.php/' + slug)
    .pipe(
      catchError(this.handleError)
    );
  }

  contactForm(formdata: Contact) {
    console.log(formdata);
    return this.http.post<Contact>(this.ServerUrl + 'send_mail.php', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }





}
