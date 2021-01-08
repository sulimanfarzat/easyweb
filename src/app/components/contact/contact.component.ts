import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { CmspageService } from '@service/cmspage.service';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { Subject } from 'rxjs';
import { Contact } from './cmspage.module';
import {debounceTime} from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  model = new Contact();
  submitted = false;
  error: {};

  formGroupContact: FormGroup;
  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `${label.toUpperCase()} IS DEFINITELY REQUIRED!`
    }, {
      error: 'pattern',
      format: (label, error) => `${label.toUpperCase()} EMAIL IS INVALID!`
    }
  ];

  private _success = new Subject<string>();
  private _danger = new Subject<string>();
  successMessage = '';
  notSuccessMessage = '';
  @ViewChild('selfClosingAlertNotSent', {static: false}) selfClosingAlertNotSent: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;

  constructor(private router: Router, private cmspageService: CmspageService, private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('easy2edi | Contact');
    // message email gesendet
    this.emailGesendet();
    this.emailNotSent();

    this.formGroupContact = new FormGroup({
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      betreff: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(35)
      ]),
      comments: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }


  onSubmit(): any {
    this.submitted = false;
    return this.cmspageService.contactForm(this.formGroupContact.value).subscribe(
      data => { (data['email'] === 'gesendet' ? this.changeSuccessMessage() : void 0) },
      error => this.error = error
    );
  }


  onReset(): any {
    return this.formGroupContact.reset();
  }

  gotoHome(): any {
    return this.router.navigate(['/']);
  }

  // message email gesendet
  private emailGesendet(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(8000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  public changeSuccessMessage() {
    this._success.next(`${new Date()}`);
    this.onReset();
  }
// message nicht gesendet
private emailNotSent(): void {
  this._danger.subscribe(message => this.notSuccessMessage = message);
  this._danger.pipe(debounceTime(8000)).subscribe(() => {
    if (this.selfClosingAlertNotSent) {
      this.selfClosingAlertNotSent.close();
    }
  });
}

public changeDangerMessage() {
  this._danger.next(`${new Date()}`);
  this.onReset();
}

}
