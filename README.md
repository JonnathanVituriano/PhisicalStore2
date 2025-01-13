# Physical Store - API Backend

Este repositório contém a implementação de uma API backend desenvolvida com **Nest.js** e **TypeScript**. O objetivo do projeto é fornecer funcionalidades de cálculo de distâncias e fretes baseados no CEP fornecido, utilizando integração com APIs externas e persistência de dados no **MongoDB**.

## Tecnologias Utilizadas

- **Node.js**
- **Nest.js**
- **TypeScript**
- **MongoDB** com **Mongoose**
- **Axios** para integração com APIs externas
- **Dotenv** para configuração de variáveis de ambiente
- **Class-validator** para validação de dados

## Funcionalidades

1. **CRUD de Lojas**: Permite criar, listar, atualizar e deletar lojas armazenadas no MongoDB.
2. **Cálculo de Distâncias e Fretes**:
   - Utiliza as APIs **ViaCEP**, **Google Maps** e **Correios** para buscar endereços, calcular distâncias e determinar os valores e prazos de frete (PAC ou SEDEX).
   - Regras de frete:
     - Para distâncias menores que 50 km, o frete é fixo em R\$ 15,00.
     - Para distâncias iguais ou superiores a 50 km, o frete é calculado com base na distância e nos preços dos serviços PAC ou SEDEX.
3. **Resposta em JSON**:
   - Dados detalhados sobre lojas, distâncias, valores de frete e prazos de entrega.

## Endpoints Planejados

- `GET /stores`: Lista todas as lojas cadastradas.
- `GET /stores/:id`: Retorna informações de uma loja específica.
- `GET /stores/cep/:cep`: Retorna lojas próximas ao CEP fornecido e calcula os fretes.
- `POST /stores`: Adiciona uma nova loja.
- `PUT /stores/:id`: Atualiza os dados de uma loja existente.
- `DELETE /stores/:id`: Remove uma loja pelo ID.

## Estrutura do Projeto

```
src/
├── config/
│   └── database.ts          # Configuração do MongoDB
├── modules/
│   └── stores/
│       ├── store.controller.ts  # Controlador das lojas
│       ├── store.service.ts     # Lógica de negócio das lojas
│       ├── store.module.ts      # Módulo das lojas
│       └── store.entity.ts      # Modelo das lojas
├── utils/
│   ├── cepFetcher.ts        # Busca informações de endereço por CEP
│   ├── distanceCalculator.ts # Calcula distâncias entre coordenadas
│   └── freightCalculator.ts  # Calcula valores e prazos de frete
├── app.module.ts            # Módulo raiz
├── main.ts                  # Inicialização da aplicação
├── .env                     # Variáveis de ambiente
├── .gitignore               # Arquivos a serem ignorados no Git
└── README.md                # Documentação do projeto
```

## Configuração Inicial

1. **Clone o Repositório**:

   ```bash
   git clone https://github.com/seu-usuario/physical-store.git
   cd physical-store
   ```

2. **Instale as Dependências**:

   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   MONGO_URI=mongodb://localhost:27017/physical-store
   GOOGLE_MAPS_API_KEY=sua_chave_google_maps
   CORREIOS_API_URL=https://www.correios.com.br/@@precosEPrazosView
   ```

4. **Inicie o Servidor**:

   ```bash
   npm run start:dev
   ```

## Testes

- As requisições podem ser testadas utilizando o **Insomnia** ou **Postman**.
- Testes unitários serão adicionados para validar as funcionalidades principais.

---

**Autor:** Jonnathan Vituriano

