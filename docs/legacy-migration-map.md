# Fradim.com.br — mapa de migração do legado

Atualizado em 27/07/2026.

## Objetivo

Migrar o domínio para o Fradim.com.br 2.0 sem transportar a arquitetura, o conteúdo contaminado ou os problemas técnicos do WordPress atual, preservando ao mesmo tempo URLs e sinais legítimos que ainda possuem valor histórico, editorial, comercial ou de busca.

## Princípios

1. Não redirecionar tudo para a Home. Um redirect só deve existir quando o destino novo responde de forma semanticamente equivalente à intenção da URL antiga.
2. Quando uma URL histórica tem valor próprio, preferir recriá-la como página estática no mesmo slug em vez de apagá-la ou diluir seu conteúdo em uma página genérica.
3. Conteúdo comprometido por spam não deve ser redirecionado para páginas importantes. O tratamento desejável é remoção/deindexação e resposta 410/404 no ambiente de produção.
4. O conteúdo comercial de restauração fotográfica ainda representa intenção de busca legítima e deve ganhar uma landing própria antes do corte do WordPress.
5. A camada de redirects depende da infraestrutura definitiva. GitHub Pages é staging e não oferece, sozinho, a mesma capacidade de redirects HTTP 301/410 de um proxy/CDN/host configurável.

## Inventário inicial

| URL legada | Estado | Destino/ação proposta | Motivo |
| --- | --- | --- | --- |
| `/` | legítima, mas posicionamento antigo | manter `/` com a nova Home | mudança de identidade do domínio; não há redirect |
| `/quemsou/` | legítima | 301 para `/memoria` | o conteúdo indexado é predominantemente sobre colorização, fotografia histórica e preservação |
| `/campanhas/` | legítima, galeria antiga | avaliar arquivo; fallback `/projetos` | há valor visual, mas não existe equivalência perfeita com um projeto novo |
| `/tag/franca-sp/` | taxonomia sem conteúdo relevante atual | 301 para `/memoria` ou futuro índice do acervo | taxonomia não precisa sobreviver como estrutura |
| `/fotos/` | comprometida por spam | remover; preferir 410/404; não redirecionar para página de autoridade | impedir transferência de sinais do conteúdo contaminado |
| `/?p=2566` | post legado por query string | arquivo editorial ou remoção após revisão | redirect por query string dependerá do proxy/host de produção |
| `/primeira-loja-do-magazine-luiza-em-1957/` | legítima e historicamente específica | preservar o mesmo slug em arquivo de Memória | conteúdo tem intenção própria e pode receber backlinks |
| `/locomotiva-em-1925/` | legítima e historicamente específica | preservar o mesmo slug em arquivo de Memória | melhor do que redirect genérico |
| `/crianca-decada-de-60/` | legítima, imagem histórica | preservar/revisar no arquivo | manter apenas se imagem/origem puderem ser documentadas |
| `/av-central-rio-de-janeiro-em-1910/` | legítima, imagem histórica | preservar/revisar no arquivo | manter apenas com proveniência e contexto suficientes |
| `/copacabana-rio-de-janeiro-anos-40/` | legítima, imagem histórica | preservar/revisar no arquivo | manter apenas com proveniência e contexto suficientes |
| `/somos-simples-naufragos/` | ensaio pessoal antigo | decisão editorial; não redirecionar automaticamente para `/ideias` | assunto não é semanticamente equivalente às novas teses de IA/inovação |
| `/nada-acontece-por-acaso/` | ensaio pessoal antigo | decisão editorial; não redirecionar automaticamente para `/ideias` | preservar somente se fizer sentido no arquivo autoral |
| `/porque-o-tempo-nao-para-nos-tornamos-velhos/` | ensaio pessoal antigo | decisão editorial; não redirecionar automaticamente para `/ideias` | evitar redirects artificiais apenas para conservar URL |
| `/a-diferenca-entre-vida-simples-minimalismo-e-frugalidade/` | ensaio pessoal antigo | decisão editorial; arquivo ou remoção | conteúdo não pertence ao eixo principal atual |

## Nova landing necessária antes da migração

### `/restauracao-fotografica`

A Home do WordPress ainda atende uma intenção comercial clara relacionada a restauração digital de fotografias. Substituí-la diretamente pela nova identidade faria o domínio perder uma página dedicada à consulta que hoje sustenta parte do conteúdo indexado.

A nova landing deve:

- explicar restauração e recuperação digital de fotografias sem prometer resultados impossíveis;
- conectar o serviço à experiência histórica de Marcelo e à página `/memoria`;
- separar restauração documental de reconstruções interpretativas com IA;
- usar `/contato` como CTA;
- ter metadata/canonical próprios;
- entrar no sitemap da produção;
- não dominar a Home nem recolocar o domínio inteiro no posicionamento antigo.

## Arquivo de Memória

As URLs históricas específicas devem evoluir para um pequeno arquivo editorial, idealmente preservando seus slugs originais. Cada página deve conter, quando disponível:

- título e data aproximada do registro;
- imagem restaurada e, quando possível, original;
- proveniência/fonte;
- localização;
- distinção entre dado documentado e inferência;
- breve contexto histórico;
- nota sobre o tipo de intervenção visual aplicada;
- links para `/memoria` e para outros registros relacionados.

Não importar automaticamente posts do WordPress. O arquivo novo deve ser curado.

## Conteúdo comprometido

Foi observado no site/indexação atual conteúdo estranho à finalidade do domínio na rota `/fotos/`, indicando comprometimento editorial/técnico do WordPress. Esse material não deve ser migrado, republicado ou redirecionado para páginas de autoridade.

Antes do corte do domínio:

1. exportar apenas o que for explicitamente aprovado;
2. manter cópia privada do banco/mídia legado para recuperação histórica, sem reaproveitar código/plugin do WordPress comprometido;
3. trocar credenciais e revisar contas administrativas do ambiente antigo;
4. remover o WordPress da exposição pública depois da migração;
5. configurar respostas de remoção para URLs contaminadas no host/CDN definitivo;
6. solicitar recrawl/deindexação após a produção nova estar estável.

## Estratégia de resposta HTTP

| Caso | Resposta desejada |
| --- | --- |
| URL antiga com equivalente novo direto | 301 |
| URL histórica recriada no mesmo slug | 200 |
| spam/URL comprometida sem valor | 410 preferencialmente, ou 404 |
| conteúdo antigo em revisão | manter fora do sitemap até decisão |
| query string antiga com equivalente conhecido | regra no proxy/CDN |

## Sequência de corte recomendada

1. Concluir navegação e rotas novas.
2. Criar `/restauracao-fotografica`.
3. Curar o primeiro lote de páginas históricas de Memória nos slugs antigos.
4. Exportar lista completa de URLs do WordPress/banco e cruzar com Search Console, se disponível.
5. Classificar cada URL: 200 preservada, 301, arquivo futuro ou 410/404.
6. Escolher a infraestrutura de produção que suporte headers e redirects HTTP reais.
7. Configurar redirects e remoções antes da troca de DNS/origin.
8. Publicar, testar códigos HTTP, canonical, robots e sitemap.
9. Só então retirar o WordPress público.
10. Monitorar 404, indexação e tráfego durante as semanas seguintes.

## O que não fazer

- copiar banco/plugins/tema do WordPress comprometido para a aplicação nova;
- apontar URLs de spam para a Home, `/sobre` ou `/memoria`;
- redirecionar ensaios antigos sem relação temática para `/ideias` apenas para evitar 404;
- remover páginas históricas que possuam backlinks sem antes avaliar possibilidade de preservação;
- trocar o domínio para o staging do GitHub Pages sem uma camada de produção preparada para redirects e headers.
