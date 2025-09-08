import { Component } from '@angular/core';
import { MovimentacaoListComponent } from './movimentacao-list/movimentacao-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovimentacaoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}