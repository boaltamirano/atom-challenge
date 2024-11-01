import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { delay, of } from 'rxjs';

@Component({
  selector: 'atom-notication-snack-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    if (!this.data.showUndoButton || (this.data.undoButtonDuration >= this.data.duration)) {
      return;
    }

    this.delayForUndoButton(this.data.undoButtonDuration).subscribe(() => {
      this.data.showUndoButton = false;
    });
  }

  delayForUndoButton(timeToDelay: number | Date) {
    return of('').pipe(delay(timeToDelay));
  }

  onDismissWithAction() {
    this.data.snackBar.dismiss();
  }

  public onDismiss() {
    this.data.snackBar.dismiss();
  }
}
