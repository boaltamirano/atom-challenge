import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
/* Modules */
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputEmailComponent } from './input-email/input-email.component';
import { RoundedButtonXlComponent } from './rounded-button-xl/rounded-button-xl.component'
import { CircularButtonComponent } from './circular-button/circular-button.component';

import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from '../core/core.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BtnActionComponent } from './btn-action/btn-action.component';
import { ToolbarFilterComponent } from './toolbar-filter/toolbar-filter.component';
import { CardListTaskComponent } from './card-list-task/card-list-task.component';
import { TextareaComponent } from './textarea/textarea.component';
import { InputSlideToggleComponent } from './input-slide-toggle/input-slide-toggle.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
    declarations: [
        LoadingScreenComponent,
        NotificationBarComponent,
        DialogConfirmationComponent,
        InputTextComponent,
        InputEmailComponent,
        RoundedButtonXlComponent,
        CircularButtonComponent,
        BtnActionComponent,
        ToolbarFilterComponent,
        CardListTaskComponent,
        TextareaComponent,
        InputSlideToggleComponent,
        ProgressBarComponent
    ],
    exports: [
        LoadingScreenComponent,
        NotificationBarComponent,
        DialogConfirmationComponent,
        InputTextComponent,
        InputEmailComponent,
        RoundedButtonXlComponent,
        CircularButtonComponent,
        BtnActionComponent,
        ToolbarFilterComponent,
        CardListTaskComponent,
        TextareaComponent,
        InputSlideToggleComponent,
        ProgressBarComponent
    ],
    imports: [
        CoreModule,
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatExpansionModule,
        CdkAccordionModule,
        MatSnackBarModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }