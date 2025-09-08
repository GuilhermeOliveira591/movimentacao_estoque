# Backend (.NET 8 + EF Core + SQLite)

## Rodando
```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

- API em: `https://localhost:5001` (ou `http://localhost:5000`)
- Swagger: `/swagger`
- CORS liberado para `http://localhost:4200`
- O banco `app.db` será criado automaticamente.

## Endpoints principais
- `GET /api/movimentacoes?codigoProduto=&data=YYYY-MM-DD&tipo=entrada|saida`
- `POST /api/movimentacoes` (body: { descricao, codigoProduto, quantidade })
- `POST /api/movimentacoes/{id}/estornar`
- `GET /api/produtos` (dados do JSON do desafio)
