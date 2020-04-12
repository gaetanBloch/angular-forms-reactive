import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly defaultGender = 'male';
  readonly forbiddenUserNames = ['Chris', 'Anna'];
  readonly forbiddenEmail = 'test@test.com';
  readonly genders = [this.defaultGender, 'female', 'other'];
  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup(
        {
          username: new FormControl(null,
            [Validators.required, this.forbiddenNames.bind(this)]),
          email: new FormControl(null,
            [Validators.required, Validators.email],
            this.forbiddenEmails.bind(this)
          ),
        }
      ),
      gender: new FormControl(this.defaultGender),
      hobbies: new FormArray([])
    });
    // this.signUpForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signUpForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get('hobbies') as FormArray).push(control);
  }

  getControls(controlName: string): AbstractControl[] {
    return (this.signUpForm.get(controlName) as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {nameIsForbidden: true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === this.forbiddenEmail) {
          resolve({emailIsForbidden: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }

  onSubmit(): void {
    console.log(this.signUpForm);
  }
}
