import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { EffectsModule } from '@ngrx/effects';
import { LayoutRoutingModule } from './layout-routing.module';
import { layoutReducer } from './_reducers/layout.reducers';
import { LayoutComponent } from './layout.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { UserEffects } from '../core/_reducers/_effects/user.effects';
import { CoreModule } from '../core/core.module';
import { AuthEffects } from '../modules/auth/_reducers/_effects/auth.effects';
import { SharedModule } from '../shared/shared.module';
import { userReducer } from '../core/_reducers/user.reducers';
import { taskReducer } from '../core/_reducers/task.reducers';
import { TaskEffects } from '../core/_reducers/_effects/task.effects';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TaskComponent } from '../modules/task/task.component';

@NgModule({
    declarations: [
        LayoutComponent,
        TaskComponent,
        NavHeaderComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        CommonModule,
        NgOptimizedImage,
        LoadingBarModule,
        LayoutRoutingModule,
        StoreModule.forFeature('layout', layoutReducer),
        StoreModule.forFeature('user', userReducer),
        StoreModule.forFeature('task', taskReducer),
        EffectsModule.forFeature([
            UserEffects,
            AuthEffects,
            TaskEffects
        ]),
        MatToolbarModule, 
        MatButtonModule, 
        MatIconModule
    ]
})
export class LayoutModule { }
