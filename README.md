Exercicio 1

**Exercicio 2**

- Criado um arquivo de teste com a describe ' GET/ CUSTOMERS ' que agrupa cenários do endpoint documentado no exercicio 1
- Utilizada a URL base da API via Cypress.env('apiUrl') para deixar o teste independente de ambiente
- Montei as URLs usando template literals (${baseUrl}/customers?...) conforme o requisito do curso
- Em cada cy.request eu desestruturei a resposta retornada no .then(({ status, body }) => { ... }) e, quando preciso, desestruturei body em { customers, pageInfo } para usar apenas o que é necessário nas asserções
- Testei explicitamente o status em todos os casos (200 para sucesso; 400 para requisições inválidas)

**Decisões de design e vantagens da implementação**

- Desestruturação reduz verbosidade e deixa claro exatamente o que cada asserção usa (facilita manutenção)

- Testar o status primeiro melhora a legibilidade do erro quando algo falha (você vê logo se foi problema de status ou conteúdo)

- Usar Cypress.env torna os testes portáveis entre ambientes (local, staging, CI) sem mudar o código

- Validar filtros diretamente nos objetos retornados (forEach + desestruturação) garante que o servidor aplicou os filtros em todos os registros retornados — é uma verificação funcional simples e eficaz



Vá para a seção de [estrutura do curso](./lessons/_course-structure_.md).

___

Este é um curso da [**Escola Talking About Testing**](https://talking-about-testing.vercel.app/).
