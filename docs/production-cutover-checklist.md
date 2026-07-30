# Fradim.com.br 2.0 — Production Cutover Checklist

Este documento prepara o corte do WordPress legado para a nova aplicação. Ele **não autoriza nem executa** publicação, alteração de DNS ou mudança de origem.

## Estado técnico exigido antes do corte

- PR/commit escolhido como release candidate com CI verde.
- `Validate production SEO preflight` verde no CI principal.
- `config/legacy-routes.json` com `pending: []`.
- `public/_redirects` e `worker/generated-legacy-removals.mjs` sincronizados com o manifesto.
- `config/legacy-media-published.json` validado e sem vazamento de mídia `hold/rejected` para `public/`.
- Production build gerado com `NEXT_PUBLIC_SITE_ENV=production` e `NEXT_PUBLIC_BASE_PATH=""`.
- `robots.txt` de produção permitindo crawl e apontando para `https://fradim.com.br/sitemap.xml`.
- Sitemap e canonicals usando somente `https://fradim.com.br`.
- Nenhum HTML de produção contendo `github.io`, `/sitefradim` ou `noindex`.

## Matriz de legado congelada para o corte

### Preservar — HTTP 200

- `/primeira-loja-do-magazine-luiza-em-1957/`
- `/locomotiva-em-1925/`
- `/av-central-rio-de-janeiro-em-1910/`
- `/copacabana-rio-de-janeiro-anos-40/`
- `/crianca-decada-de-60/`
- `/somos-simples-naufragos/`
- `/nada-acontece-por-acaso/`
- `/porque-o-tempo-nao-para-nos-tornamos-velhos/`
- `/a-diferenca-entre-vida-simples-minimalismo-e-frugalidade/`
- `/campanhas/`

### Redirecionar — HTTP 301

- `/quemsou/` → `/restauracao-fotografica/`

### Remover — HTTP 410

- `/fotos/`
- `/tag/franca-sp/`

A fonte de verdade continua sendo `config/legacy-routes.json`; esta lista é apenas uma fotografia legível da release candidate.

## Antes de alterar DNS

1. Registrar os valores atuais de DNS do domínio, TTLs e origem do WordPress para rollback.
2. Confirmar onde os registros `@` e `www` estão apontando e se ambos devem responder pela nova aplicação.
3. Fazer backup do WordPress e do banco de dados sem reutilizá-los como origem da nova aplicação.
4. Confirmar acesso administrativo à conta Cloudflare que receberá o Worker/Static Assets.
5. Criar credencial de deploy com privilégio mínimo. Não armazenar token no repositório.
6. Executar novamente o CI/preflight no commit exato que será publicado.
7. Congelar alterações editoriais durante a janela de corte.

## Publicação técnica na Cloudflare — somente após autorização explícita

1. Publicar o Worker + Static Assets a partir do `out/` validado e do `worker/index.mjs` validado.
2. Verificar a URL temporária/preview da Cloudflare antes de associar `fradim.com.br`.
3. Testar no preview:
   - Home, Universo, Memória, Ideias, Projetos, Campanhas e Restauração.
   - os 10 slugs `preserve/200`.
   - `/quemsou/` retornando `301` para `/restauracao-fotografica/`.
   - `/fotos/` e `/tag/franca-sp/` retornando `410` + `X-Robots-Tag: noindex, nofollow`.
   - assets `_next`, CSS, JS e as duas imagens históricas publicadas.
4. Conferir headers, HTTPS e ausência de loops de redirect.
5. Só então associar o domínio/custom route à aplicação.

## Validação imediatamente após o corte

Executar sem cache e em janela anônima:

- `https://fradim.com.br/` → 200.
- `https://www.fradim.com.br/` → comportamento canônico definido para o domínio.
- `robots.txt` → crawl permitido.
- `sitemap.xml` → URLs de produção, sem staging.
- canonicals das páginas principais e legadas → `fradim.com.br`.
- `/quemsou/` → 301, um único salto.
- `/fotos/` → 410.
- `/tag/franca-sp/` → 410.
- nenhum staging `github.io` indexável.
- nenhuma página publicada com `noindex` por acidente.
- Home mobile mantém comportamento progressivo do WebGL.
- Memória exibe somente as 2 mídias aprovadas; Avenida, Copacabana e Criança permanecem sem asset publicado.

## Observação nas primeiras horas

- erros 4xx/5xx inesperados;
- loops ou cadeias de redirects;
- falhas de assets estáticos;
- console errors importantes;
- queda anormal de disponibilidade;
- URLs antigas relevantes que apareçam nos logs e ainda não estejam no manifesto;
- comportamento do Google Search Console após envio do sitemap novo.

## Rollback

Se houver falha crítica no corte:

1. não alterar o manifesto para mascarar o problema;
2. remover/desassociar a rota de produção do Worker ou restaurar o apontamento/origem anterior conforme a infraestrutura definida no momento do corte;
3. restaurar os valores DNS/origem registrados antes da mudança;
4. confirmar que o WordPress anterior voltou a responder antes de encerrar o incidente;
5. manter a release candidate e os logs do erro para correção em staging;
6. executar novamente o Production Preflight antes de uma segunda tentativa.

## Regra de decisão

**Preparado não significa publicado.**

O corte só deve ocorrer quando houver autorização explícita do responsável pelo domínio e acesso às credenciais de produção. Até esse momento, GitHub Pages continua sendo staging e a infraestrutura Cloudflare permanece dormente.
