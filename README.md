# Quark (Desafio de Código)

Bem-vindo ao repositório **Quark**! Este projeto foi desenvolvido como parte de um **desafio de código** e demonstra habilidades em desenvolvimento **full stack** com tecnologias modernas.

---

## 🚀 Visão Geral

O Quark é uma aplicação web composta por dois módulos principais:

- **Frontend:** SPA desenvolvida em Angular, com foco em experiência do usuário, responsividade e boas práticas.
- **Backend:** API desenvolvida em Java, responsável pelas regras de negócio, persistência de dados e integração com o frontend.
- **Autenticação:** Utilização do **Keycloak** para gerenciamento de autenticação e autorização de usuários.

---

## 🛠️ Ferramentas e Tecnologias Utilizadas

### **Frontend**
- **[Angular](https://angular.io/):** Framework SPA (TypeScript)
- **[Angular Material](https://material.angular.io/):** Componentes visuais e temas
- **[SCSS](https://sass-lang.com/):** Pré-processador CSS
- **[Font Awesome](https://fontawesome.com/):** Ícones de redes sociais
- **[Keycloak JS e angular-oauth2-oidc](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter):** Integração com Keycloak para autenticação
- **Testes:** Jasmine, Karma, Protractor

### **Backend**
- **[Java](https://www.java.com/):** Linguagem principal
- **Frameworks comuns:** Spring Boot ou Jakarta EE (confirme conforme o desafio)
- **[Keycloak Spring Boot Adapter](https://www.keycloak.org/docs/latest/securing_apps/#_spring_boot_adapter):** Integração do backend com Keycloak
- **Banco de Dados:** H2, PostgreSQL, MySQL, etc. (dependendo do desafio)
- **Build:** Maven ou Gradle
- **Testes:** JUnit, Mockito

### **Autenticação**
- **[Keycloak](https://www.keycloak.org/):** Gerenciamento de autenticação, autorização, Single Sign-On (SSO) e controle de acesso.
    - O projeto inclui um export do Realm e instruções para rodar o Keycloak localmente.

### **Outras Ferramentas**
- **[Git](https://git-scm.com/):** Controle de versão
- **[Node.js](https://nodejs.org/), [npm](https://npmjs.com/):** Gerenciamento de pacotes frontend

---

## 📦 Como Executar o Projeto

### 1. Pré-requisitos

- Node.js >= 18.x e NPM >= 9.x (para o frontend)
- Java >= 17 (ou versão especificada no desafio)
- Maven ou Gradle (para o backend)
- Angular CLI (para desenvolvimento frontend):  
  `npm install -g @angular/cli`
- Docker (opcional, para rodar o Keycloak facilmente)

### 2. Instalação

Clone o repositório:

```sh
git clone https://github.com/alvarobarrosjunior/quark.git
cd quark
```

#### **Keycloak**
- Veja em `/keycloak/README.md` as instruções para rodar o Keycloak localmente (por exemplo, via Docker) e importar o realm de configuração do projeto.

#### **Frontend**
```sh
cd frontend
npm install
ng serve
# Acesse http://localhost:4200
```

#### **Backend**
```sh
cd backend
# Para Maven:
mvn spring-boot:run
# Ou para Gradle:
./gradlew bootRun
# API disponível em http://localhost:8080 (ajuste conforme o projeto)
```

---

## 📑 Detalhes Importantes

- **Footer Fixo:** O rodapé permanece sempre no fim da página.
- **Responsividade:** Layout adaptável a qualquer dispositivo.
- **Ícones Sociais:** Utiliza Font Awesome para garantir cobertura completa.
- **Customização de Tema:** SCSS e Angular Material.
- **Integração Front/Back:** O frontend consome a API REST do backend.
- **Keycloak:** Toda autenticação e autorização é centralizada via Keycloak, protegendo rotas no frontend e endpoints no backend.
- **Estrutura Modular:** Separação clara entre frontend, backend e autenticação.

---

## 📝 Observações

- Este projeto é uma base para avaliação técnica.
- O foco está na clareza do código, organização, boas práticas e usabilidade.
- Sugestões e melhorias são bem-vindas!

---

## 📄 Licença

Projeto para fins de avaliação técnica, sem licença específica.

---

**Dúvidas ou sugestões? Abra uma issue!**