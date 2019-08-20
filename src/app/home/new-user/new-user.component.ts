import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { forkJoin } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  constructor(private homeService: HomeService, private fb: FormBuilder) {
    this.createUserForm();
  }

  public users: User[] = [];
  public userListFilter: string = "";
  public userForm: FormGroup;

  daysOfweekList = [
    { name: 'Sun', id: 1 },
    { name: 'Mon', id: 2 },
    { name: 'Tue', id: 3 },
    { name: 'Wed', id: 4 },
    { name: 'Thu', id: 5 },
    { name: 'Fri', id: 6 },
    { name: 'Sat', id: 7 }
  ];

  ngOnInit() {

  }

  createUserForm() {

    this.userForm = this.fb.group({
      username: ["", Validators.required],
      city: "",
      name: ["", Validators.required],
      email: ["", Validators.required],
      rideInGroup: ["", Validators.required],
      daysOfweek: new FormArray([], this.minSelectedCheckboxes(1))
    });

    this.daysOfweekList.map((o, i) => {
      const control = new FormControl(false);
      (this.userForm.controls.daysOfweek as FormArray).push(control);
    });
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {

      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);

      return totalSelected >= min ? null : { required: true };

    };

    return validator;
  }


  saveUser() {

    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.controls[key].markAsDirty();
      });
      return;
    }

    const selectedDaysOfWeek = this.userForm.value.daysOfweek
      .map((checked, index) => checked ? this.daysOfweekList[index].id : null)
      .filter(value => value !== null);

    let obj = this.userForm.value;

    selectedDaysOfWeek.forEach(dayId => {
      this.daysOfweekList.forEach(day => {
        if (dayId == day.id) {
          if (!obj.daysofweek) {
            obj.daysofweek = [];
          }
          obj.daysofweek.push(day);
        }
      });
    });

    obj.rideInGroup = +obj.rideInGroup;

    this.homeService.insertNewUser.next(obj);

    this.userForm.reset();

  }
}
