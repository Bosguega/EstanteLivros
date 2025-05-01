# Guia de Testes da PWA - Estante de Livros

Este documento fornece instruções sobre como testar a funcionalidade PWA (Progressive Web App) da aplicação Estante de Livros.

## Verificando o Status da PWA

A aplicação agora inclui um componente de status da PWA que mostra informações importantes sobre o estado atual da aplicação:

- **Suporte a PWA**: Indica se seu navegador suporta PWAs
- **Executando como PWA**: Mostra se a aplicação está sendo executada como uma PWA instalada
- **Status de conexão**: Exibe se você está online ou offline
- **Service Worker**: Confirma se o service worker está registrado corretamente
- **Cache**: Mostra informações sobre os recursos em cache

## Como Testar o Modo Offline

Para testar se a aplicação funciona corretamente no modo offline, siga estas etapas:

1. **Carregue a aplicação**: Acesse a aplicação e navegue por algumas páginas para garantir que os recursos sejam carregados e armazenados em cache

2. **Desconecte da internet**: 
   - No Chrome: Abra o DevTools (F12), vá para a aba "Network" e marque a opção "Offline"
   - Ou simplesmente desative sua conexão Wi-Fi/dados móveis

3. **Recarregue a página**: A aplicação deve continuar funcionando, mostrando o conteúdo que já foi carregado anteriormente

4. **Verifique o status**: O componente de status da PWA deve mostrar que você está offline, mas a aplicação continua funcionando

5. **Teste a página offline**: Se você tentar acessar uma página que não foi carregada anteriormente, deverá ver a página offline.html personalizada

## Como Instalar a PWA

### Em Dispositivos Android (Chrome)

1. Acesse a aplicação no Chrome
2. Aguarde alguns segundos até que o Chrome mostre um banner "Adicionar à tela inicial" ou um ícone de instalação na barra de endereço
3. Toque em "Adicionar à tela inicial" ou no ícone de instalação
4. Siga as instruções para instalar a aplicação

### Em Dispositivos iOS (Safari)

1. Acesse a aplicação no Safari
2. Toque no ícone de compartilhamento (o quadrado com uma seta para cima)
3. Role para baixo e toque em "Adicionar à Tela de Início"
4. Dê um nome à aplicação e toque em "Adicionar"

### Em Computadores (Chrome, Edge)

1. Acesse a aplicação no navegador
2. Procure pelo ícone de instalação na barra de endereço (geralmente um símbolo de "+" ou um ícone de computador)
3. Clique no ícone e siga as instruções para instalar

## Verificando Atualizações

Quando uma nova versão da aplicação estiver disponível:

1. Uma notificação será exibida informando sobre a nova versão
2. Clique em "Atualizar agora" para atualizar para a versão mais recente

## Solução de Problemas

Se a PWA não estiver funcionando corretamente:

1. Verifique se seu navegador é compatível com PWAs (Chrome, Edge, Safari, Firefox)
2. Limpe o cache do navegador e tente novamente
3. Verifique se o service worker está registrado corretamente usando o componente de status da PWA
4. Em caso de problemas persistentes, tente desinstalar e reinstalar a aplicação

## Recursos Adicionais

- A aplicação inclui um componente de notificação que informa quando uma nova versão está disponível ou quando a aplicação está pronta para uso offline
- O service worker gerencia automaticamente o cache dos recursos para garantir que a aplicação funcione offline
- Os ícones da PWA foram otimizados para diferentes tamanhos e dispositivos