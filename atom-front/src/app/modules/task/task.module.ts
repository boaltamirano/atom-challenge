import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaskComponent } from './task.component';
import { InitComponent } from './pages/init/init.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskCreateDialogComponent } from './components/task-create-dialog/task-create-dialog.component';

@NgModule({
  declarations: [
    InitComponent,
    TaskCreateDialogComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    CoreModule,
    SharedModule,
  ],
  bootstrap: [TaskComponent]
})
export class TaskModule { }
