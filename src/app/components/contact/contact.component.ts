import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CmspageService } from '@service/cmspage.service';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { Contact } from './cmspage.module';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  selectedPersonId = 'Please select';

  model = new Contact();
  submitted = false;
  error: {};

  formGroup: FormGroup;
  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `${label.toUpperCase()} IS DEFINITELY REQUIRED!`
    }, {
      error: 'pattern',
      format: (label, error) => `${label.toUpperCase()} EMAIL IS INVALID!`
    }
  ];

  constructor(private router: Router, private cmspageService: CmspageService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
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
        Validators.maxLength(30)
      ]),
      comments: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  onSubmit(): any {
    this.submitted = true;
    return this.cmspageService.contactForm(this.formGroup.value).subscribe(
      data => this.model = data,
      error => this.error = error
    );
  }

  onReset(): any {
    this.formGroup.reset();
  }

  gotoHome(): any {
    this.router.navigate(['/']);
  }



}
