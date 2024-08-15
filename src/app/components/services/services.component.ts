import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import {NgbModal, ModalDismissReasons, NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { Subject} from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { CmspageService } from '@service/cmspage.service';

@Component({
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit  {

  closeResult = '';
  product: any = '';
  selectedItems: any;

  submitted = false;
  error: {};

  formGroupAnfrage: UntypedFormGroup;
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

  constructor(private modalService: NgbModal, private titleService:Title,
              private cmspageService: CmspageService) {
   }

  ngOnInit(): void {
    this.titleService.setTitle('easy2edi | Services');

    // message email gesendet
    this.emailGesendet();
    this.emailNotSent();

    this.formGroupAnfrage = new UntypedFormGroup({
      thema: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(35)
      ]),
      firmenname: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      fName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      lName: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      land: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      tel: new UntypedFormControl('', [
        Validators.required
      ]),
      version: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      anfrage: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
      ,
      handlungsbedarf: new UntypedFormControl('', [
      ])
    });
  }



  // open model
 open(content, x): void {
    this.modalService.open(content,  { centered: true, size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.product = x;
    //this.formGroupAnfrage.get('thema').setValue('some value');
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  // form
  onSubmit(): any {
    if (this.formGroupAnfrage.valid) {
      this.submitted = false;
      return this.cmspageService.angebotForm(this.formGroupAnfrage.value).subscribe(
        data => { (data['email'] === 'gesendet' ? this.changeSuccessMessage() : void 0)  },
        error => this.error = error
      );
    } else {
      return console.log('erorr');
    }
  }

  onReset(): any {
    return this.formGroupAnfrage.reset();
  }
    // message email gesendet
    private emailGesendet(): void {
      this._success.subscribe(message => this.successMessage = message);
      this._success.pipe(debounceTime(15000)).subscribe(() => {
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
    this._danger.pipe(debounceTime(15000)).subscribe(() => {
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


// pipe


@Pipe({
  name: 'safe'
})

export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
