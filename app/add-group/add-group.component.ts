import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { listGroup } from '../shared/list-of-groups';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent {
  

  added = false;
  list = listGroup;

  groups: string[]=[];

  addGroup(newGroup: string){
    if(newGroup){
      for (var i=0; i<=this.list.length; i++){
        if(newGroup === this.list[i].name){
          break
        }else {
          this.list[i].name = newGroup;
          this.groups.push(newGroup);
        }
      }
    }
    window.alert('Group added successfully!')
  }
  
}










// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
// export class InputErrorStateMatcherExample {
//   emailFormControl = new FormControl('', [Validators.required, Validators.email]);

//   matcher = new MyErrorStateMatcher();
// }
