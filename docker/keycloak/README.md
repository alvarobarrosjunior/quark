# Keycloak – Configuração e Uso no Projeto Quark

Este diretório contém os arquivos e instruções para rodar e configurar o **Keycloak** como provedor de autenticação para o projeto **Quark**.

---

## 🚀 Como executar

No terminal, dentro da raiz do projeto, execute:

```sh
docker-compose up -d
```

Isso irá iniciar o Keycloak já configurado para uso no projeto.

---

## 📥 Detalhes: Importando o Realm

O arquivo `realm-export.json` deste diretório contém todas as configurações necessárias do realm para o projeto Quark (incluindo clients, usuários de teste, roles e permissões).

Se precisar importar manualmente:

1. Acesse o painel do Keycloak em [http://localhost:8081](http://localhost:8081) e faça login como administrador (`admin` / `admin`).
2. No menu lateral, clique em **Realms > Add realm**.
3. Escolha a opção **Import**.
4. Selecione o arquivo `realm-export.json` deste diretório.
5. Clique em **Create** para concluir a importação.

---

## 📄 Observações

- Ajuste as configurações de clientId, clientSecret e URLs do Keycloak nos arquivos de configuração do frontend e backend conforme necessário.
- O realm pode ser reimportado a qualquer momento para restaurar as configurações padrão.

---

**Dúvidas? Consulte a documentação oficial do Keycloak ou abra uma issue no repositório principal.**