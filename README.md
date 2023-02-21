## Projeto aplicando práticas do DDD

Projeto de referência: https://github.com/devfullcycle/fc-ddd-patterns


- Porque não há necessidade de DTOs para comunicação entre o caso de uso e o repositório?
- Não seria melhor que produto A e B fossem implementações de uma classe abstrata?
- Nos testes de integração, devo usar outros métodos do repositório (além dos que estão sendo testados no momento), ou uso o model do sequelize diretamente?
- Devo fazer testes de integração usecase + repositório e controller + usecase + repositório?
- As configurações do express não poderiam ficar em uma camada de "Presentation"
- nos testes E2E, eu poderia verificar diretamente no banco de dados para saber se os dados foram manipuilados de forma correta?
- O deveria alterar o valor na minha instância, mesmo antes de validá-lo?
