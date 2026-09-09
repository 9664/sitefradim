# Fradim: presença visual + SEO/GEO

Implementação de setembro de 2026. O domínio público serve uma versão diferente da branch Next.js recuperada. Esta proposta é isolada: não altera domínio, DNS, conteúdo histórico nem o site de produção.

## O que foi implementado

Nova home editorial responsiva com retrato já publicado, projetos, galeria ampliável do acervo, áreas de atuação, Marcelo × Spock, perguntas e contato. Página factual `/marcelo-fradim/` distinta da narrativa existente em `/sobre/`. Imagens WebP com procedência em `assets/provenance.json`. Nenhum retrato sintético novo, depoimento inventado ou métrica fictícia.

Person, WebSite, WebPage e FAQPage na home; ProfilePage e BreadcrumbList no perfil. Conteúdo, links e navegação funcionam sem JavaScript; a ampliação das fotos é um aprimoramento. Fontes de sistema, sem fontes binárias distribuídas. `llms.txt` é somente um índice opcional, não um mecanismo de posicionamento.

## Build reproduzível

Python 3 + Pillow e ferramentas isoladas Playwright + axe para a revisão. O workflow captura a página pública do CartazAI e obtém as demais imagens no próprio fradim.com.br.

Entrada recomendada: `python redesign/fetch_and_build.py --output preview`.

Pacote parcial de integração: `python redesign/fetch_and_build.py --output production-overlay --production`.

A opção `--offline` exige o cache completo em `redesign/.asset-cache/`, inclusive `cartazai.png` e, para produção, `sitemap.xml`. `fetch_and_build.py` identifica as requisições públicas e aplica o acabamento de contenção das linhas decorativas. `build.py` é o gerador interno. A imagem social de 1200 × 630 é capturada pelo script de revisão a partir da própria home.

## Publicação e segurança da integração

O workflow publica somente no staging do GitHub Pages. Isso substitui a home antiga de staging, não a produção. O histórico do repositório permanece preservado.

**`production-overlay` é um pacote PARCIAL, não o site inteiro. Não executar `wrangler deploy` nem substituir a pasta de produção com ele isoladamente.** A integração exige o projeto completo e atual: converter home e perfil para suas rotas, preservar os assets do Next.js, payloads RSC, conteúdo, redirecionamentos e respostas 404/410. Não substituir apenas index.html deixando o payload cliente antigo, pois a navegação pode reintroduzir a versão anterior.

O sitemap de produção mantém todas as URLs atuais e acrescenta o perfil. A política existente permitia todos os agentes; o pacote explicita OAI-SearchBot sem mudar a política de treinamento. Também é necessário conferir as permissões do CDN/WAF, pois robots.txt sozinho não garante acesso.

A prévia usa `noindex` e canonical do domínio oficial. Para publicar definitivamente, recuperar a origem atual, validar a integração, guardar rollback e então realizar o deploy pelo ambiente correto, sem mudar DNS desnecessariamente. Nenhuma posição no Google ou citação em respostas de IA é garantida.

## Verificações

O workflow verifica quatro larguras, carregamento de imagens após rolagem, overflow horizontal, H1, canonical, dados estruturados, menu móvel, galeria, foco após fechamento, funcionamento sem JavaScript e acessibilidade automatizada com axe. Os resultados e capturas estão no artefato. Esses testes não equivalem a uma auditoria humana completa de acessibilidade nem a resultados reais de indexação.

## Referências técnicas

- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/structured-data/profile-page
- https://developers.openai.com/api/docs/bots
