import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './add-event/add-event.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';

const routes: Routes = [
  { path: 'add-event', component: AddEventComponent },
  { path: 'post', component: ListEventsComponent},
  { path: 'add-group', component: AddGroupComponent},
  { path: 'group', component: ListGroupsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
