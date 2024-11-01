import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task.component';
import { InitComponent } from './pages/init/init.component';

const routes: Routes = [{
    path: '',
    component: TaskComponent,
    children: [{
        path: '',
        component: InitComponent,
        title: 'Task'
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule { }
