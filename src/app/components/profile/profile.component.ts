import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@service/auth/auth.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from 'src/app/modules/user.model';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  editable: boolean = false;
  user = firebase.auth().currentUser;
  message = '';
  @Input() userData?: User;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentUser: User = {
    name: '',
    displayName: '',
    emailVerified: false
  };



  constructor(public auth: AuthService) {
   }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentUser = { ...this.userData };
  }

 public updateUserX(id, newUser){
    this.auth.update( id, 'Suliman');
  }


  updatePublished(status: boolean): void {
    if (this.currentUser.uid) {
      this.auth.update(this.currentUser.uid, { published: status })
      .then(() => {
        this.currentUser.emailVerified = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateUser(): void {
    const data = {
      name: this.currentUser.name,
      displayName: this.user.displayName
    };
    console.log(this.currentUser.uid);
    if (this.user.uid) {
      this.auth.update(this.user.uid, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
    }
  }


  deleteTutorial(): void {
    if (this.user.uid) {
      this.auth.delete(this.user.uid)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
