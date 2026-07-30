# Fradim.com.br — arquitetura de produção

Atualizado em 27/07/2026.

## Decisão

**Staging:** GitHub Pages  
**Produção recomendada:** Cloudflare Workers + Static Assets

Esta configuração ainda está dormente no repositório. Não há domínio conectado, mudança de DNS, token de deploy ou publicação de produção configurados.

## Por que não usar o staging como produção

O GitHub Pages funciona bem para validar o export estático, mas a migração do WordPress exige controle explícito sobre respostas HTTP legadas:

- preservar determinadas URLs com `200` no mesmo endereço;
- redirecionar equivalentes reais com `301`/`308`;
- responder `410` ou `404` a conteúdo que não deve sobreviver;
- aplicar headers como `X-Robots-Tag` em remoções;
- manter a lógica de migração versionada junto do código.

## Arquitetura escolhida

O build do Next.js continua produzindo `out/` com `output: "export"`.

No Cloudflare:

1. Static Assets serve arquivos existentes diretamente.
2. `public/_redirects`, gerado a partir do manifesto, aplica redirects HTTP antes da entrega dos assets.
3. Se não houver asset correspondente, a requisição chega ao Worker.
4. O Worker consulta `worker/generated-legacy-removals.mjs`.
5. Uma rota explicitamente removida recebe o status definido no manifesto, além de `X-Robots-Tag: noindex, nofollow`.
6. Qualquer outro caminho não encontrado é delegado para `env.ASSETS.fetch(request)` e segue como ausência normal.

Não usamos `assets.run_worker_first: true`. A entrega normal de HTML, CSS, JavaScript e mídia permanece asset-first; o Worker não precisa executar para cada arquivo existente.

Também não configuramos `not_found_handling: "single-page-application"` nem `"404-page"` neste momento, pois queremos que um caminho sem asset possa chegar ao Worker e receber uma decisão 410 quando o manifesto assim determinar.

## Arquivos envolvidos

### Fonte de verdade

`config/legacy-routes.json`

Contém decisões `resolved` e itens ainda `pending`.

Ações aceitas:

- `preserve` + `200`
- `redirect` + `301` ou `308`
- `remove` + `404` ou `410`

### Validação editorial/técnica

`scripts/validate-legacy-routes.mjs`

Impede rotas duplicadas, combinações inválidas de ação/status e decisões antecipadas dentro da lista `pending`.

### Geração Cloudflare

`scripts/generate-cloudflare-routing.mjs`

Gera:

- `public/_redirects`
- `worker/generated-legacy-removals.mjs`

Os arquivos gerados ficam commitados para revisão. O CI os regenera e falha se houver diferença não commitada.

### Validação contra o build

`scripts/validate-cloudflare-output.mjs`

Depois do `next build`, verifica:

- `preserve`: o HTML precisa existir em `out/`;
- `redirect`: um destino interno precisa existir em `out/`;
- `remove`: não pode existir HTML estático no mesmo caminho, pois o asset-first responderia antes do Worker.

### Worker

`worker/index.mjs`

Executa somente quando necessário no modelo asset-first e implementa as respostas de remoção explícitas.

### Wrangler

`wrangler.jsonc`

Aponta o Worker para `worker/index.mjs` e os assets para `./out`, usando `html_handling: "auto-trailing-slash"`.

Não há `route`, `custom_domain`, `workers_dev`, credenciais ou comando de deploy configurados nesta fase.

## Comandos locais

Validar o manifesto:

```bash
npm run validate:legacy
```

Regenerar arquivos do Cloudflare:

```bash
npm run generate:cloudflare
```

Build completo preparado para produção:

```bash
npm run build:cloudflare
```

Este último executa manifesto → geração → Next build → validação do output.

## Fluxo para uma futura decisão de redirect

Exemplo conceitual:

1. Auditar URL antiga, conteúdo e backlinks.
2. Confirmar equivalente semântico novo.
3. Mover a rota de `pending` para `resolved` no manifesto.
4. Definir `action: "redirect"`, status e target.
5. Rodar `npm run generate:cloudflare`.
6. Revisar o diff de `_redirects`.
7. CI confirma que o destino realmente existe no build.

Nenhum redirect deve ser digitado manualmente em `_redirects`.

## Fluxo para uma futura remoção 410

1. Confirmar que a URL não deve ser preservada e não possui equivalente apropriado.
2. Remover qualquer página estática que ocupe o mesmo caminho.
3. Mover a rota para `resolved` com `action: "remove"` e `status: 410`.
4. Rodar `npm run generate:cloudflare`.
5. O gerador atualiza a tabela usada pelo Worker.
6. O CI falha se ainda existir um HTML em `out/` para aquela URL.

## Pré-requisitos antes de qualquer deploy real

- conta Cloudflare sob controle do proprietário do domínio;
- zona DNS do domínio gerenciada no Cloudflare para uso de Custom Domain do Worker;
- auditoria final das URLs legadas;
- backup privado do conteúdo legítimo do WordPress;
- rotação/revisão de credenciais do WordPress comprometido;
- decisão sobre `www` versus domínio raiz;
- plano de rollback;
- validação em endereço de preview antes de alterar a origem do domínio;
- somente depois disso configurar token de CI e automação de deploy.

## Sequência de corte recomendada

1. Fechar o lote inicial do arquivo histórico e redirects.
2. Gerar e validar o build Cloudflare local/CI.
3. Conectar Cloudflare sem alterar ainda a origem pública.
4. Publicar uma versão de preview separada.
5. Testar 200, 301, 404/410, canonical, robots, sitemap e assets.
6. Congelar alterações editoriais no WordPress antigo.
7. Fazer backup final.
8. Alterar a origem do domínio.
9. Repetir testes HTTP em produção.
10. Monitorar 404, indexação e tráfego.
11. Só depois retirar o WordPress antigo da exposição pública.

## Referências técnicas oficiais

- Cloudflare Workers — Static Assets
- Cloudflare Workers — Static Assets / Redirects
- Cloudflare Workers — Static Assets / Configuration and Bindings
- Cloudflare Workers — Static Assets / HTML handling
- Cloudflare Workers — migration guide from Pages to Workers

A implementação deve ser reconferida contra a documentação oficial antes do corte, pois plataforma e opções de configuração podem evoluir.
