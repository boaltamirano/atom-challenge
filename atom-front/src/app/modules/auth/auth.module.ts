import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthComponent } from './auth.component';
import { CoreModule } from 'src/app/core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { layoutReducer } from 'src/app/layout/_reducers/layout.reducers';
import { authReducer } from './_reducers/auth.reducers';
import { AuthEffects } from './_reducers/_effects/auth.effects';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserEffects } from 'src/app/core/_reducers/_effects/user.effects';
import { userReducer } from 'src/app/core/_reducers/user.reducers';
import { taskReducer } from 'src/app/core/_reducers/task.reducers';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        AuthComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        StoreModule.forFeature('auth', authReducer),
        StoreModule.forFeature('layout', layoutReducer),
        StoreModule.forFeature('user', userReducer),
        StoreModule.forFeature('task', taskReducer),
        EffectsModule.forFeature([AuthEffects, UserEffects])
    ]
})
export class AuthModule { }
