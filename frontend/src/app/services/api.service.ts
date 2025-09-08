import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';
import { Movimentacao } from '../models/movimentacao.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/produtos`);
  }

  getMovimentacoes(codigoProduto?: number): Observable<Movimentacao[]> {
    let url = `${this.baseUrl}/movimentacoes`;
    if (codigoProduto) {
      url += `?codigoProduto=${codigoProduto}`;
    }
    return this.http.get<Movimentacao[]>(url);
  }

  createMovimentacao(movimentacao: { descricao: string, codigoProduto: number, quantidade: number }): Observable<Movimentacao> {
    return this.http.post<Movimentacao>(`${this.baseUrl}/movimentacoes`, movimentacao);
  }

  estornarMovimentacao(id: number): Observable<Movimentacao> {
    return this.http.post<Movimentacao>(`${this.baseUrl}/movimentacoes/estornar/${id}`, {});
  }
}
