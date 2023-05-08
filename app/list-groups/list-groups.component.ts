import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';;
import { listGroup } from '../shared/list-of-groups';
import { ApiService } from '../Service/api.service';
import { Group } from '../Group';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger} from '@angular/animations';

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
  list = listGroup;
  listGroups: Group[] = [];

  searchText = '';
  public dataSource: MatTableDataSource<any>=new MatTableDataSource<Group>()
  @ViewChild (MatSort) sort!: MatSort;
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getListGroups() {
    this.apiService.getGroup().subscribe({
      next:data=>{
        this.listGroups = data;
        console.log(this.listGroups)
      }
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

}
