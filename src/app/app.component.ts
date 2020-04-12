import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly defaultGender = 'male';
  readonly forbiddenUserNames = ['Chris', 'Anna'];
  genders = [this.defaultGender, 'female', 'other'];
  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userData: new FormGroup(
        {
          username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
          email: new FormControl(null, [Validators.required, Validators.email]),
        }
      ),
      gender: new FormControl(this.defaultGender),
      hobbies: new FormArray([])
    });
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get('hobbies') as FormArray).push(control);
  }

  getControls(controlName: string): AbstractControl[] {
    return (this.signUpForm.get(controlName) as FormArray).controls;
  }

  onSubmit(): void {
    console.log(this.signUpForm);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {nameIsForbidden: true};
    }
    return null;
  }
}
