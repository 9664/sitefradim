# Fradim: presença visual + SEO/GEO

Proposta implementada em setembro de 2026. O domínio público serve uma versão de setembro diferente da branch Next.js recuperada (julho). Por isso esta proposta é **isolada**: nenhum deploy de produção, domínio, DNS, página histórica ou aplicação existente é substituído automaticamente.

## Conteúdo

- Nova home editorial responsiva: retrato já publicado, projetos, acervo, áreas de atuação, Marcelo × Spock, FAQ e contato.
- Página factual `/marcelo-fradim/`, distinta da narrativa já existente em `/sobre/`.
- Person + WebSite + WebPage + FAQPage; ProfilePage e BreadcrumbList na página de perfil.
- Conteúdo e imagens funcionam sem JavaScript. JS é usado somente para ampliar imagens e fechar o menu móvel.
- Imagens otimizadas localmente no build, com procedência em `assets/provenance.json`. Sem retratos sintéticos novos, depoimentos inventados ou métricas fictícias.
- Nenhuma fonte binária é incluída. Tipografia usa fontes de sistema.
- `llms.txt` é um índice opcional, não um mecanismo de posicionamento e não substitui HTML rastreável.

## Build

Python 3 + Pillow. O workflow captura a página pública do CartazAI antes do build. Os demais arquivos vêm de imagens já publicadas no próprio fradim.com.br.

`python redesign/build.py --output preview`

`python redesign/build.py --output production-overlay --production`

A opção `--offline` reutiliza `redesign/.asset-cache/` e exige o cache completo.

## Publicação

O workflow publica **somente no endereço de staging do GitHub Pages**. A home de staging anterior é substituída pela proposta, mas o histórico do repositório e o site em fradim.com.br não mudam.

`production-overlay` é **um pacote parcial**, não o site inteiro. Não executar `wrangler deploy` nem substituir a pasta de produção com esse pacote isoladamente. Mesclar os arquivos no build completo e atual de setembro de 2026, após recuperar a origem correta. Preservar as rotas atuais, os assets do Next.js, redirecionamentos e respostas 404/410.

Na integração final com Next.js, converter a home e o perfil para rotas do projeto atual; não apenas substituir index.html e deixar o payload RSC antigo. Validar navegação de ida e volta entre páginas antigas e novas. Se o host atual for puramente estático, também confirmar que a navegação cliente do site anterior não reintroduz a home antiga.

O build de produção mescla a nova URL no sitemap existente, sem remover URLs históricas. O robots atual permitia todos os agentes; a proposta explicita OAI-SearchBot sem alterar a política de treinamento existente. Confirmar também permissões no CDN/WAF, que não podem ser verificadas apenas por robots.txt.

Não alterar DNS nem publicar uma cópia antiga do projeto como substituta da produção atual. Manter snapshot e rollback da origem atual. Depois de publicar, verificar HTML renderizado, recursos, links, Search Console e indexação. Nenhuma posição no Google ou citação por sistemas de IA é garantida.

## Referências técnicas

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.openai.com/api/docs/bots

## Testes

O workflow verifica duas larguras, imagens após rolagem, ausência de overflow horizontal, H1/canonical, dados estruturados, menu móvel, lightbox, funcionamento sem JavaScript e acessibilidade automatizada com axe. Os resultados e capturas são entregues no artefato; não equivalem a uma auditoria humana completa de acessibilidade nem a resultados reais de indexação.
