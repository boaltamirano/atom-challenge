import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';
import { NotificationBarComponent } from 'src/app/shared/notification-bar/notification-bar.component';

export enum MessageType {
    Sussess,
    Warning,
    Information,
    Danger
}

@Injectable({
    providedIn: 'root'
})
export class LayoutUtilsServices {

    constructor(
        private snackBar: MatSnackBar,
        public dialog: MatDialog
    ) { }

    showNotification(
        message: string,
        type: MessageType = MessageType.Information,
        duration: number = 2000,
        showCloseButton: boolean = true,
        showUndoButton: boolean = true,
        undoButtonDuration: number = 10000,
        verticalPosition: 'top' | 'bottom' = 'top',
        horizontalPosition: 'left' | 'center' | 'right' = 'center'
    ) {
        const data = {
            message,
            snackBar: this.snackBar,
            showCloseButton,
            showUndoButton,
            undoButtonDuration,
            verticalPosition,
            horizontalPosition,
            type,
            action: 'Undo'
        };
        
        return this.snackBar.openFromComponent(NotificationBarComponent, {
            duration,
            data,
            verticalPosition,
            horizontalPosition
        });
    }

    showConfirmation(
        config: {
            title?: string
            message?: string
            textBtnCanceleAction?: string
            textBtnAction?: string
        } | undefined = undefined
    ) {
        const data = {
            title: config?.title || '',
            message: config?.message || '',
            textBtnCanceleAction: config?.textBtnCanceleAction || 'No',
            textBtnAction: config?.textBtnAction || 'Si',
        };
        return this.dialog.open(DialogConfirmationComponent, {
            data: data,
            width: '424px'
        });
    }

}
