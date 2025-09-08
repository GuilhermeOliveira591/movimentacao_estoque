import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Produto } from '../models/produto.model';

@Component({
  selector: 'app-movimentacao-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './movimentacao-form.component.html',
  styleUrl: './movimentacao-form.component.css'
})
export class MovimentacaoFormComponent {
  descricao: string = '';
  codigoProduto: number | null = null;
  quantidade: number | null = null;
  produtos: Produto[] = [];

  constructor(
    public dialogRef: MatDialogRef<MovimentacaoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { produtos: Produto[] }
  ) {
    this.produtos = data.produtos;
  }

  onSave(): void {
    if (this.descricao && this.codigoProduto && this.quantidade) {
      this.dialogRef.close({
        descricao: this.descricao,
        codigoProduto: this.codigoProduto,
        quantidade: this.quantidade
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
