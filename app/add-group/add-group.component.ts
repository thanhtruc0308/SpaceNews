import { Component, OnInit, ElementRef, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';import {ErrorStateMatcher} from '@angular/material/core';
import { listGroup } from '../../shared/list-of-groups';
import { HttpClient } from '@angular/common/http';
import { Group } from 'src/app/Group';
import { ApiService } from '../../Service/api.service';
import { HandleGroupService } from 'src/app/Service/handle-group.service';
import { Route, Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Member } from 'src/app/Member';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit{
  addGroupForm = new FormGroup({
    groupName: new FormControl(''),
    // groupMember: new FormGroup({
    //   memberName: new FormControl(''),
    //   memberMail: new FormControl('')
    // }),
  });

  addgroupMember= new FormGroup({
    memberName: new FormControl(''),
    memberMail: new FormControl('')
  })

  members: Member[] = []; // members added to group
  allMembers: Member[] = []; // all members (added to db)
  filteredOptions: Observable<string[]>;
  autoCompleteList: any[]
  searchOption: Member[] = []
  // @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  memberName: string ='';
  memberMail: string ='';
  // @Output() onSelectedOption = new EventEmitter();
  


  constructor(
    private apiService: ApiService, 
    private router: Router,
    private fb: FormBuilder,
    private groupService: HandleGroupService,
    public dialog: MatDialog) 
    {}

  ngOnInit(): void {
    this.addGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      // groupMember: this.fb.group({
      //   memberName: ['', Validators.required],
      //   memberMail: ['', Validators.required]
      // })
    });
    this.addgroupMember = this.fb.group({
      memberName: ['', Validators.required],
      memberMail: ['', Validators.required]
    })
    this.searchOption = this.groupService.searchOption;
    this.loadMembers();
    this.addgroupMember.valueChanges.subscribe((userInput: any) => {
      this.autoCompleteExpenseList(userInput);
    })
  }
  loadMembers(){
    this.apiService.getMembers().subscribe({
      next:data => {
        this.allMembers = data;
        console.log(data);
      }
    })
  }

  private autoCompleteExpenseList(input: any) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }
  
  filterCategoryList(val: any) {
    var categoryList = []
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allMembers.filter((s: { name: string; }) => s.name.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allMembers;
  }

  displayFn(member: Member) {
    let k = member ? member.name : member;
    return k;
  }

  filteredListOptions() {
    let members = this.allMembers;
        let filteredMembersList = [];
        for (let member of members) {
            for (let options of this.searchOption) {
                if (options.name === member.name || options.email === member.email) {
                  filteredMembersList.push(member);
                }
            }
        }
        console.log(filteredMembersList);
        return filteredMembersList;
  }

  filterMemberList(event: { source: { value: any; }; }) {
    var members = event.source.value;
    if(!members) {
      this.groupService.searchOption=[]
    }
    else {
      console.log("not")

      this.groupService.searchOption.push(members);
      this.searchOption.push(members);
      this.onSelectedOption(this.searchOption)
    }
        
      this.focusOnPlaceInput();
  }

  removeOption(option: any) {
        
    let index = this.groupService.searchOption.indexOf(option);
    if (index >= 0)
        this.groupService.searchOption.splice(index, 1);
        this.focusOnPlaceInput();

        this.onSelectedOption(this.groupService.searchOption)
  }

  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

  onSelectedOption(e: any) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.groupService.searchOption.length > 0)
      this.members = this.groupService.filteredListOptions();
    else {
      this.members = this.groupService.memberData;
    }

    console.log(this.members)
  }


  addHandler(){
    let member = Object(this.addgroupMember.value);
    console.log(member);
    this.members.push({
      name : member.name,
      email: member.email
    });


    
    //     const dialogRef = this.dialog.open(WarningDialog);
    //     dialogRef.afterClosed().subscribe(result => {
    //       console.log('The dialog was closed');
    //       this.members = result;
    //     });
    //     this.groupService.addMembers(member).subscribe({
    //       next:data => {
    //         alert('Member is added');
    //       },
    //       error: err => {console.log(err)}
    //     })
    //   }
    //   else {
    //     this.members.push({
    //       name: this.memberName,
    //       email: this.memberMail,
    //     });


    
    console.log(this.members)
  }

  onSubmit(){
    let data = Object(this.addGroupForm.value);
    this.addGroupForm.reset();

    this.groupService.addGroup(data.groupName).subscribe({
      next:data=>{
        alert('Success');
      },
      error:err=>{console.log(err)}
    })
    // this.groupService.addGroupMembers().subscribe({
    //   next:data => {

    //   }
    // })
    // this.router.navigateByUrl('/group');
  }
  

  

}

// @Component({
//   selector: 'warning-dialog',
//   templateUrl: '../warning-dialog/warning-dialog.html',
//   styleUrls: ['../warning-dialog/warning-dialog.css']
// })
// export class WarningDialog {
//   constructor(
//     public dialogRef: MatDialogRef<WarningDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: Member,
//     private groupService : HandleGroupService,
//   ) {}


//   addMember(){
//     this.groupService.addMembers(this.data).subscribe({
//       next:data => {
//         alert('Member is added');
//       },
//       error: err => {console.log(err)}
//     })
//     this.onNoClick();
//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
