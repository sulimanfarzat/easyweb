import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { CmspageService } from 'src/app/services/cmspage.service';
import { Contact } from './cmspage.module';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  formGroup: FormGroup;

  model = new Contact();
  submitted = false;
  error: {};

  constructor(private router: Router, private cmspageService: CmspageService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email_address: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      user_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(25)
      ]),
      betreff: new FormControl(''),
      subject: new FormControl(''),
      comments: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);

    this.submitted = true;
    return this.cmspageService.contactForm(this.formGroup.value).subscribe(
      data => this.model = data,
      error => this.error = error
    );
  }

  onReset() {
    this.formGroup.reset();
  }

  gotoHome() {
    this.router.navigate(['/']);
  }



}
