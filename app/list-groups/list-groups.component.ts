import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';;
import { listGroup } from '../shared/list-of-groups';
import { ApiService } from '../Service/api.service';
import { Group } from '../Group';
import { Post } from '../PostEvent';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { ListGroup } from '../ListGroup';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HandleGroupService } from '../Service/handle-group.service';


@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ListGroupsComponent implements OnInit, AfterViewInit{
  @Input() pageIndex = 0;
  @Input() keyWord : string|undefined;
  @Output() changePage = new EventEmitter();

  keyWordOrigin : string |undefined;
  list: ListGroup[] = [];
  groups: Group[] = [];
  listPost: Post[] = [];

  searchText = '';
  public dataSource: MatTableDataSource<any>=new MatTableDataSource<Group>()
  @ViewChild (MatSort) sort!: MatSort;
  constructor(private apiService: ApiService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getListGroups();
    // this.getListPost();
    // this.totalPost();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getListGroups() {
    this.apiService.getGroup().subscribe({
      next:data=>{
        this.groups = data;
        // this.handleGroup();
        console.log(this.groups);
      }
    })
  }


  // handleGroup(){
  //   let name: string;
  //   let upcoming: number; 
  //   let totalPost: number;
  //   let lastEvent = new Date(); 
  //   this.groups.forEach(p=>{
  //     name = p.name;
  //     // totalPost = this.totalPost(p.id);
  //     upcoming = 3;
  //     this.list.push({name, upcoming, totalPost, lastEvent});
  //   })
    
    
  // }

  filterGroups(searchText: string){
    this.dataSource.filter = searchText.trim().toLocaleLowerCase();
    const filterValue = searchText;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }

  upcomingEvents(){

  }

  // totalPost(id: number){
  //   let countPost: Post[] = [];
  //   let total: number = 0;
  //   let post: Post;

  //   // for(var i=0; i<=this.listGroups.length; i++){
  //   //   if(i===id){
  //   //     for(var j=0; j<=this.listPost.length; j++){
  //   //       post = this.listPost[j];
  //   //       console.log(this.listPost[j]);
  //   //       if(i===post.group.id){
  //   //         countPost.push(post);
  //   //       }
  //   //     }

  //   //   }
  //   // }
    
  //   this.groups.forEach(g=>{
  //     if(g.id===id){
  //       // console.log(g);
  //       this.listPost.forEach(p=>{
  //         // console.log(p);
  //         if(g.id===p.group.id){
  //           countPost.push(p);
  //           // console.log(p);
  //         }
  //       })
  //     }
  //   })
  //   // console.log(countPost.length);
  //   return countPost.length;   
  // }
  

  //handle detail-btn
  groupDetail(id:number){
    let group = this.groups.find(p => p.id ==id);
    const dialogRef = this.dialog.open(GroupDetailsDialog, {
      data : group
    });
    // console.log(group)
  }

  //handle edit-btn
  editGroup(id:number){
    let group = this.groups.find(p => p.id == id);
    const dialogRef = this.dialog.open(GroupEditDialog, {
      data : group
    });
  }

  //handle delete-btn
  deleteGroup(id:number){
    this.apiService.deleteGroup(id).subscribe(group =>{
      this.getListGroups();
    });
    // console.log(id)
  }

}
@Component({
  selector: 'group-details-dialog',
  templateUrl: '../group-details-dialog/group-details-dialog.html',
  styleUrls: ['../group-details-dialog/group-details-dialog.css']
})
export class GroupDetailsDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GroupDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Group,
    private apiService : ApiService
  ) {}
  group = this.data;
  ngOnInit(): void {
    
  }
}

@Component({
  selector: 'group-edit-dialog',
  templateUrl: '../group-edit-dialog/group-edit-dialog.html',
  styleUrls: ['../group-edit-dialog/group-edit-dialog.css']
})
export class GroupEditDialog implements OnInit{
  editGroupForm = new FormGroup({
    groupName: new FormControl(''),
    groupMail: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<GroupEditDialog>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private groupService: HandleGroupService,
    @Inject(MAT_DIALOG_DATA) public data: Group,
    
  ) {}
  

  group = this.data;
  ngOnInit(): void {
    this.editGroupForm = this.fb.group({
      groupName: ['', Validators.required],
      groupMail: ['', Validators.required]
    })
  }
  onSubmit(){
    let data = Object(this.editGroupForm.value);
    this.editGroupForm.reset();

    //delete the old group
    // this.apiService.deleteGroup(data).subscribe();

    //add editted group
    this.groupService.addGroup(data).subscribe({
      next:data=>{
        alert('Success');
      },
      error:err=>{console.log(err)}
    })
  }
}
