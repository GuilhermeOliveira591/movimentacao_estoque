# Desafio Full Stack — Movimentações de Estoque

Este repositório contém um backend (.NET 8 + EF Core/SQLite) e um frontend (Angular 17 + Material) para:
- Consultar movimentações (com filtros por produto, data e tipo)
- Lançar movimentações (entrada/saída via quantidade positiva/negativa)
- Estornar movimentações (gera lançamento inverso)

## Como executar

### Backend
```bash
cd backend
dotnet restore
dotnet run
# API em http://localhost:5000 (Swagger em /swagger)
```

### Frontend
```bash
cd frontend
npm install
npm start
# App em http://localhost:4200
```

## Observações
- A lista de produtos vem do `backend/seed.json` conforme o JSON do desafio.
- O banco `app.db` é criado automaticamente (SQLite).

Bom teste! 🚀
