import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { ApiService } from '../services/api.service';
import { Movimentacao } from '../models/movimentacao.model';
import { Produto } from '../models/produto.model';
import { MovimentacaoFormComponent } from '../movimentacao-form/movimentacao-form.component';


@Component({
  selector: 'app-movimentacao-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './movimentacao-list.component.html',
  styleUrl: './movimentacao-list.component.css'
})
export class MovimentacaoListComponent implements OnInit {
  movimentacoes: Movimentacao[] = [];
  produtos: Produto[] = [];
  displayedColumns: string[] = ['id', 'descricao', 'codigoProduto', 'data', 'quantidade', 'actions'];
  filterCodigoProduto: number | null = null;

  constructor(private apiService: ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProdutos();
    this.loadMovimentacoes();
  }

  loadProdutos(): void {
    this.apiService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  loadMovimentacoes(): void {
    this.apiService.getMovimentacoes(this.filterCodigoProduto || undefined).subscribe(data => {
      this.movimentacoes = data;
    });
  }

  openCreateMovimentacaoDialog(): void {
    const dialogRef = this.dialog.open(MovimentacaoFormComponent, {
      width: '400px',
      data: { produtos: this.produtos }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.createMovimentacao(result).subscribe(() => {
          this.loadMovimentacoes();
        });
      }
    });
  }

  estornarMovimentacao(id: number): void {
    if (confirm('Tem certeza que deseja estornar esta movimentação?')) {
      this.apiService.estornarMovimentacao(id).subscribe(() => {
        this.loadMovimentacoes();
      });
    }
  }
}