import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'task',
                loadChildren: () => import('../modules/task/task.module').then((m) => m.TaskModule)
            },
            { path: '', redirectTo: 'task', pathMatch: 'full' },
            { path: '**', redirectTo: 'task', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
