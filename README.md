# Vue Inbox

Simples caixa de entrada que permite os usuários autenticar-se no sistema, visualizar, enviar e responder e-mails.

Para executar este projeto siga os passos descritos no arquivo [passo-a-passo](passo-a-passo.md)

## Membros da equipe

André Torquato, 501740, Sistemas de Informação
Elixandre da Silveira Silva Filho, 478164, Sistemas de Informação

## Papéis ou tipos de usuário da aplicação

- Usuário

## Entidades ou tabelas do sistema

- Usuário
- E-mails
- Tags

## Principais funcionalidades da aplicação

- O usuário pode usar atalhos do teclado para executar ações como marcar um e-mail como lido ou arquivado
- O usuário pode autenticar-se no sistema
- O usuário pode enviar um e-mail 
- O usuário pode responder um e-mail
- O usuário pode excluir e-mails
- O usuário pode visualizar seus e-mails não lidos
- O usuário pode arquivar e-mails
- O usuário pode criar marcadores
- O usuário pode vincular marcadores a e-mails
- O usuário pode filtrar e-mails por seus respectivos marcadores


## Tecnologias e frameworks utilizados

**Frontend:**

- VueJS v3.0, 
- Vue-Router 
- Pinia.
- Vue Firebase
- Axios

**Backend:**

- Firebase


## Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuário |  | x |  |  |
| Email | X  | X |  X | X |
| Tag | X  | X |  X |  |
