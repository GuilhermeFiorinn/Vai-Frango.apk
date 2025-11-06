# Vai-Frango.App

Aplicativo de gerenciamento de treinos desenvolvido com Ionic React e Capacitor.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (normalmente vem com o Node.js)
- [Capacitor](https://capacitorjs.com/) para recursos nativos

## Como Rodar o Projeto

1. Instale as dependências:
```bash
npm install
```

2. Instale o Ionic CLI globalmente (se ainda não tiver):
```bash
npm install -g @ionic/cli
```

3. Instale o plugin do Capacitor Filesystem:
```bash
npm install @capacitor/filesystem
```

4. Sincronize o projeto com o Capacitor:
```bash
npx cap sync
```

5. Execute o projeto:
```bash
ionic serve
```

O aplicativo abrirá automaticamente em seu navegador em `http://localhost:8100`.

## Estrutura do Projeto

- `src/components/` - Componentes reutilizáveis
- `src/pages/` - Páginas do aplicativo
- `src/data/` - Arquivos JSON com dados
- `src/lib/` - Funções utilitárias
- `src/theme/` - Configurações de tema

## Funcionalidades

- Agenda de treinos
- Gerenciamento de exercícios
- Perfil do usuário