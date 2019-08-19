import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { forkJoin } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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

    const daysOfweekFormControls = this.daysOfweekList.map(control => new FormControl(false));

    this.userForm = this.fb.group({
      username: ["", Validators.required],
      city: "",
      name: ["", Validators.required],
      email: ["", Validators.required],
      rideInGroup: ["", Validators.required],
      daysOfweek: new FormArray(daysOfweekFormControls)
    });
  }

  saveUser() {

    const selectedDaysOfWeek = this.userForm.value.daysOfweek
    .map((checked, index) => checked ? this.daysOfweekList[index].id : null)
    .filter(value => value !== null);

    this.homeService.insertNewUser.next(this.userForm.value);

  }
}
