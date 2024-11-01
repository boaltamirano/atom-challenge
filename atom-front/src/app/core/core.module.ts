import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRippleModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip'
import { DragDropModule } from '@angular/cdk/drag-drop';

import { LayoutUtilsServices } from './_services/layout-utils.services';

import { NgxPermissionsModule } from 'ngx-permissions';
@NgModule({

    declarations: [

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatRadioModule,
        MatDividerModule,
        MatDialogModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatSortModule,
        MatProgressBarModule,
        CdkTreeModule,
        MatTooltipModule,
        MatSlideToggleModule,
        NgxPermissionsModule.forChild(),
        DragDropModule,
        MatExpansionModule,
        MatChipsModule,
        MatBottomSheetModule,
        MatRippleModule,
        ScrollingModule,
        MatAutocompleteModule
    ],
    exports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatRadioModule,
        MatDividerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        MatProgressBarModule,
        MatDialogModule,
        CdkTreeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTooltipModule,
        MatSlideToggleModule,
        DragDropModule,
        NgxPermissionsModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatChipsModule,
        MatBottomSheetModule,
        MatRippleModule,
        ScrollingModule,
        MatAutocompleteModule,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        LayoutUtilsServices
    ]
})
export class CoreModule { }
