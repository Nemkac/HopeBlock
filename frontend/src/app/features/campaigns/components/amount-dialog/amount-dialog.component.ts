import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-amount-dialog',
  templateUrl: './amount-dialog.component.html',
  styleUrl: './amount-dialog.component.css'
})
export class AmountDialogComponent {

  form = this.fb.group({
    amount: [0.01, [Validators.required, Validators.min(0.01), Validators.max(100)]]
  });

  constructor(
    public dialogRef: MatDialogRef<AmountDialogComponent>,
    private fb: FormBuilder
  ) { }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.amount);
    }
  }
}
