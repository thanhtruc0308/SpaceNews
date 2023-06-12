import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HandleGroupService } from 'src/app/Service/handle-group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/app/Member';
import { MatDialog } from '@angular/material/dialog';
import { HandleMemberService } from 'src/app/Service/handle-member.service';
import { GroupMembers } from 'src/app/GroupMembers';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit{
  currGroup: GroupMembers;
  addGroupForm = new FormGroup({
    groupName: new FormControl(''),
    memberName: new FormControl(''),
    memberMail: new FormControl('')
  });


  members: Member[] = []; // members add to group
  allMembers: Member[] = []; // all members (added to db)
  groups: GroupMembers[] = [];
  groupID: number = 0;
  memberName: string = '';
  memberMail: string = '';


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private groupService: HandleGroupService,
    private memberService: HandleMemberService,
    private _route: ActivatedRoute,
    public dialog: MatDialog) 
    {}

  ngOnInit(): void {
    this.groupID = Number(this._route.snapshot.paramMap.get('id'));
    this.addGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      memberName: ['', Validators.required],
      memberMail: ['', Validators.required]
    });

    this.loadMembers();
    this.loadGroups();

  }
  //load groups
  LoadGroup(id : number){
    this.groupService.getGroup(id).subscribe({
      next: data => {
        this.currGroup = data;
        let listMemberId = this.currGroup.memberId.split('');
        listMemberId.forEach(p => {
          this.memberService.getMember(Number(p)).subscribe({
            next: member =>{
              this.memberName = member.name;
              this.memberMail = member.email;
              console.log(member)
            }
          })
        })
        this.addGroupForm.setValue({
          groupName: data.name,
          memberName: this.memberName,
          memberMail: this.memberMail,
        })
      }
    })
  }

  loadMembers(){
    this.memberService.getMembers().subscribe({
      next:data => {
        this.allMembers = data;
      }
    })
  }
  loadGroups(){
    this.groupService.loadAllGroups().subscribe({
      next:data=>{
        this.groups = data;
      }
    })
  }


  
  
  addHandler(){
    let memberName = this.addGroupForm.get('memberName')?.value;
    let memberMail = this.addGroupForm.get('memberMail')?.value;
    console.log(memberName);
    this.members.push({
      name : String(memberName),
      email: String(memberMail),
      id: 0
    });
    //add new members
    console.log(this.members);
    let listNewMembers = this.addMember();
    console.log(listNewMembers);
    listNewMembers.forEach(p=>{
      this.memberService.addMember(p).subscribe({
        next:data=>{
          this.loadMembers();
        }
      })
    })
  }
  //add to new members to database
  addMember(){
    let m: Member;
    let mem: Member;
    let listNewMembers: Member[] = []; // list of New members
    
    this.members.forEach(p=>{
      const found = this.allMembers.find(x => p.name == x.name && p.email == x.email)
      if (found == null){
        listNewMembers.push(p);
      }
    })
      
    return listNewMembers
  }
  getlistMemberId(){
    let listMemberId = new Set() //list Id of members add to group
    this.members.forEach(p=>{
      this.allMembers.forEach(x=>{
        if(p.name === x.name && p.email === x.email){
          if (listMemberId.has(x.id) == false) listMemberId.add(x.id);
        }
      })
    })
    return Array.from(listMemberId);
  }


  onSubmit(){
    let data = Object(this.addGroupForm.value);
    this.addGroupForm.reset();
    let listMemberId = this.getlistMemberId();
    this.getlistMemberId();
    //add new group
    this.groupService.editGroup(data, listMemberId.toString(), this.groupID).subscribe({
      next:data=>{
        alert('Success');
        this.loadGroups();
      },
      error:err=>{console.log(err)}
    });
    this.router.navigate(['/group']);
  }
}

