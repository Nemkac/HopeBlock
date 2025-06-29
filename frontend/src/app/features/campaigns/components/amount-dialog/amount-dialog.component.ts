import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

interface Token {
  name: string;
  tokenType: 'ETH' | 'ERC20';
  tokenAddress?: string;
}

@Component({
  selector: 'app-amount-dialog',
  templateUrl: './amount-dialog.component.html',
  styleUrl: './amount-dialog.component.css'
})
export class AmountDialogComponent {

  tokens: Token[] = [
    { name: 'Ethereum (ETH)', tokenType: 'ETH' },
    { name: 'USDC (Sepolia)', tokenType: 'ERC20', tokenAddress: '0xee103Fd8bd413B26b9655472a2598C645C2c563a' }
  ];

  form = this.fb.group({
    amount: [0.01, [Validators.required, Validators.min(0.01), Validators.max(100)]],
    token: [this.tokens[0], Validators.required]
  });

  constructor(
    public dialogRef: MatDialogRef<AmountDialogComponent>,
    private fb: FormBuilder
  ) { }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close({
        save: true,
        amount: this.form.value.amount,
        token: this.form.value.token
      });
    }
  }

  close() {
    this.dialogRef.close({ save: false });
  }
}
