import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';;
import { listGroup } from '../shared/list-of-groups';
import { ApiService } from '../Service/api.service';
import { Group } from '../Group';
import { Post } from '../PostEvent';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { ListGroup } from '../ListGroup';

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
  listGroups: Group[] = [];
  listPost: Post[] = [];

  searchText = '';
  public dataSource: MatTableDataSource<any>=new MatTableDataSource<Group>()
  @ViewChild (MatSort) sort!: MatSort;
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getListGroups();
    this.getListPost();
    // this.totalPost();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  getListPost(pagenum = 0){
    this.apiService.getPost(pagenum).subscribe({
      next:data =>{
        this.listPost = data;
        console.log(this.listPost);
      }
    })
  
  }


  getListGroups() {
    this.apiService.getGroup().subscribe({
      next:data=>{
        this.listGroups = data;
        this.handleGroup();
        console.log(this.list);
      }
    })
    
    
  }


  handleGroup(){
    let name: string;
    let upcoming: number; 
    let totalPost: number;
    let lastEvent = new Date(); 
    this.listGroups.forEach(p=>{
      name = p.name;
      totalPost = this.totalPost(p.id);
      upcoming = 3;
      this.list.push({name, upcoming, totalPost, lastEvent});
    })
    
    
  }

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

  totalPost(id: number){
    let countPost: Post[] = [];
    let total: number = 0;
    let post: Post;

    // for(var i=0; i<=this.listGroups.length; i++){
    //   if(i===id){
    //     for(var j=0; j<=this.listPost.length; j++){
    //       post = this.listPost[j];
    //       console.log(this.listPost[j]);
    //       if(i===post.group.id){
    //         countPost.push(post);
    //       }
    //     }

    //   }
    // }
    
    this.listGroups.forEach(g=>{
      if(g.id===id){
        // console.log(g);
        this.listPost.forEach(p=>{
          console.log(p);
          if(g.id===p.group.id){
            countPost.push(p);
            console.log(p);
          }
        })
      }
    })
    // console.log(countPost.length);
    return countPost.length;   
  }
  

  //handle detail-btn
  groupDetail(){

  }

}
