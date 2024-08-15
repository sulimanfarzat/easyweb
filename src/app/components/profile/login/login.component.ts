import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { AuthService } from '@service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: UntypedFormGroup;
  formGroupSignUp: UntypedFormGroup;

  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `${label.toUpperCase()} IS DEFINITELY REQUIRED!`
    }, {
      error: 'pattern',
      format: (label, error) => `${label.toUpperCase()} DOESN'T LOOK RIGHT...`
    }
  ];

  constructor(private modalService: NgbModal,public activeModal: NgbActiveModal,
              public auth: AuthService,public  router:  Router) { }

  ngOnInit(): void {
    this.formGroup = new UntypedFormGroup({
      Email: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      Password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    });

    this.formGroupSignUp = new UntypedFormGroup({
      Name: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      Email: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      Password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      PasswordConfirm: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    });
  }

  onSubmit() {
    console.log(this.formGroup);
    return this.auth.emailSignin(this.formGroup.value.Email, this.formGroup.value.Password);
  }

  onSubmitSignUp() {
    console.log(this.formGroupSignUp.value);
    return this.auth.emailSignup(this.formGroupSignUp.value.Name,this.formGroupSignUp.value.Email, this.formGroupSignUp.value.Password);
  }

  onSubmitGoogle (): void {
    this.auth.googleSignin();
    this.router.navigate(['profile']);
    this.activeModal.close('Close click');
  }

  onReset() {
    return this.formGroup.reset();
  }

}
