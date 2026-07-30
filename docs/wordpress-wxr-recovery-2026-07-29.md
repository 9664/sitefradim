# Recuperação do WordPress — WXR 29/07/2026

## Decisão

O arquivo `restauraodefotosmarcelofradim.WordPress.2026-07-29.xml` será tratado como **fonte privada de recuperação**, não como backup restaurável e nunca como pacote de importação direta.

SHA-256 do arquivo recebido:

`d483312f2d2a2feff909291233b418b0c82838cbd2d4314e68212b7a358a941c`

Tamanho: 19.738.447 bytes.

## Auditoria estrutural

| Classe | Quantidade | Tratamento |
| --- | ---: | --- |
| Itens totais no WXR | 2.565 | inventário |
| Posts publicados | 85 | sanitizar e enviar para revisão editorial |
| Posts no lixo | 1.601 | quarentena; não migrar |
| Anexos referenciados | 828 | inventário; os binários não estão dentro do XML |
| Páginas publicadas | 29 | classificar individualmente |
| Scripts injetados nos posts publicados | 223 | removidos pelo sanitizador |
| Posts publicados com script injetado | 85 | 100% do lote publicado |
| Anexos ligados a conteúdo candidato | 494 | recuperar do `wp-content/uploads` e validar |
| Anexos órfãos ou ligados a itens descartados | 334 | manter em quarentena |

## O que o ataque deixou no export

Todos os 85 posts publicados mantêm um ou mais blocos `<script>` injetados. Foram encontrados 223 blocos, incluindo JavaScript ofuscado com `atob()` e carregamento remoto de `groundrats.org`.

O WXR também contém:

- 1.601 posts em `trash`, predominantemente spam de cassinos, apostas e conteúdo automatizado;
- a página publicada `guide-3541`, com link de cassino escondido fora da tela;
- taxonomias de spam como `powbet-greece`, `powbet-casino-gr`, `casino-leon-portugal`, `spindragons` e `wintopia-online`;
- termos residuais do WPCode que não devem entrar na nova aplicação.

## O que conseguimos recuperar

Os posts legítimos mantêm:

- ID, slug e título;
- corpo editorial antes do script injetado;
- referência ao anexo destacado;
- links e imagens do acervo;
- a data original em `_wp_old_date` em 84 dos 85 posts.

As datas aparentes de março de 2026 não serão usadas como cronologia. O pipeline prioriza `_wp_old_date`; apenas o item que não possui esse metadado mantém a data própria do registro.

## Política de incorporação no Fradim 2.0

1. O XML bruto permanece fora do repositório público e fora de `public/`.
2. `scripts/sanitize-wordpress-wxr.py` gera cópias limpas para revisão, sem executar PHP ou JavaScript.
3. Todo `script`, `iframe`, `object`, `embed`, formulário, evento inline e atributo de estilo é removido.
4. Posts em `trash`, páginas ocultas de spam e taxonomias contaminadas são descartados.
5. O resultado sanitizado recebe estado `review-required`; nada é publicado automaticamente.
6. O conteúdo aprovado entra por coleção: Memória, Arquivo autoral, Tecnologia e Portfólio visual.
7. Slugs são preservados apenas quando a página merece continuar em `200`. Os demais recebem 301 semântico ou 410.
8. As imagens só entram depois de recuperar os binários de `wp-content/uploads`, validar magic bytes, MIME, dimensões, hash e proveniência.
9. Nenhum plugin, tema, banco executável ou código do WordPress será reutilizado.

## Páginas do WXR

### Curadoria possível

`quemsou`, `internacionais`, `outdoors`, `logomarcas`, `campanhas`, `embalagens`, `contact`, `port`, `fotos`, `hipolito`, `portfolio`, `revista`, `fotos_colorizadas` e `3-aplicativos-que-transformam-seu-celular-em-um-scanner`.

Esses registros são apenas fontes. A estrutura visual antiga e shortcodes não serão preservados.

### Descartar como infraestrutura antiga

`loja`, `carrinho`, `finalizar-compra`, `minha-conta`, `home`, `pagina-inicial`, `home3`, `the-process`, `about`, `contact-2`, `shop`, `cart`, `checkout` e `my-account`.

### Rejeitar como comprometida

`guide-3541`.

## Próximas rodadas

### Rodada 1 — concluída nesta mudança

- registrar o inventário auditado;
- versionar o sanitizador;
- impedir que o WXR bruto ou a quarentena sejam commitados;
- expor no Arquivo Fradim somente o estado da recuperação, não o HTML antigo.

### Rodada 2 — conteúdo

Revisar os 85 posts em lotes temáticos, comparar o texto limpo com autoria e referências, e decidir `preserve`, `rewrite`, `redirect` ou `remove`.

### Rodada 3 — mídia

Receber uma cópia somente leitura de `wp-content/uploads`, cruzar os 828 anexos do XML com os arquivos reais e promover apenas assets aprovados.

### Rodada 4 — SEO e corte

Atualizar `config/legacy-routes.json`, sitemap, redirects e respostas 410 depois que cada item tiver decisão editorial e mídia resolvida.
