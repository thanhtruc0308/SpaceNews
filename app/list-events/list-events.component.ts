import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';;
import { listEvent } from '../shared/list-of-events';
import { Router } from '@angular/router';
import { Event } from '../add-event/events';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { ApiService } from '../Service/api.service';
import { Post } from '../PostEvent';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListEventsComponent implements OnInit, AfterViewInit{
  list = listEvent;
  searchText = '';

  toggleSearch: boolean = false;

  listPost: Post[] = [];

  public dataSource: MatTableDataSource<any>=new MatTableDataSource<Post>()
  @ViewChild (MatSort) sort!: MatSort;
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getListPosts()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getListPosts(){
    this.apiService.getPosts().subscribe({
      next:data=>{
        this.listPost = data;
        console.log(this.listPost)
      }
    })
  }

  filterEvents(searchText: string){
    this.dataSource.filter = searchText.trim().toLocaleLowerCase();
    const filterValue = searchText;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onMatSortChange() {
    this.dataSource.sort = this.sort;
  }


}
