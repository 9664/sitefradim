# Auditoria do Fradim.com.br 2.0

Data: 28 de julho de 2026  
Branch auditada: `agent/immersive-foundation`  
Objetivo: revisar o site como sistema de identidade, autoridade, memória, projetos e colaboração Marcelo × Spock.

## 1. Estado geral

A fundação técnica e narrativa está consolidada. O site já possui:

- Home cinematográfica com WebGL e navegação alternativa sem 3D;
- identidade pública de Marcelo Fradim;
- página conceitual e metodológica do Spock;
- páginas de IA, projetos, Lab, ideias, arquivo, memória, imprensa, campanhas e restauração;
- rotas históricas preservadas com política explícita de proveniência;
- SEO técnico, dados estruturados, sitemap, robots e preparação para Cloudflare;
- staging no GitHub Pages;
- testes de build, rotas, legado, acessibilidade visual e performance;
- página de contato profissional.

O projeto não deve ser tratado como concluído apenas porque compila. A etapa restante é principalmente de evidência, conteúdo profundo, operação e publicação em produção.

## 2. Correções realizadas nesta auditoria

### Hero da Home

- retirada a dependência do retrato SVG antigo, que produzia aparência de moldura;
- adotada a imagem correta de Marcelo com fundo transparente;
- criado processo de materialização do WebP durante o build;
- preservados parallax, órbitas frontais e cena 3D;
- acrescentada validação automática da assinatura, dimensões e presença do retrato no HTML final;
- o build agora falha se a Home voltar a usar o SVG antigo.

### Contato

A rota `/contato` aparecia no sitemap e na documentação, mas a página não existia. Foram adicionados:

- e-mail profissional;
- WhatsApp;
- LinkedIn;
- Instagram;
- territórios de colaboração;
- dados estruturados `ContactPage`;
- link na navegação principal e na Home;
- teste automático da rota e das informações públicas.

Nenhum CPF ou endereço residencial foi incluído.

### Identidade de Marcelo

A página Sobre e os dados estruturados foram ampliados com:

- localização pública em Franca, São Paulo, Brasil;
- vínculos com LinkedIn, Instagram, Behance e Corredor Cultural;
- Amo Franca desde 2014;
- restauração e pesquisa iconográfica em Franca, Pedregulho, Trairi, Piancó e Rio de Janeiro;
- competências em IA, context engineering, automação, marketing, memória digital e restauração fotográfica.

## 3. Conteúdo que já está forte

### Marcelo

A narrativa de trajetória em camadas está coerente: imagem, marca, operação, comunidade, software e inteligência artificial. A página evita transformar a carreira em uma coleção de cargos e explica o valor da conexão entre disciplinas.

### Spock

A página deixa claro que Spock é uma identidade de colaboração com inteligência artificial, não uma pessoa ou consciência independente. O método Contexto → Confronto → Construção → Verificação está bem definido.

### Inteligência artificial

A tese está clara: IA não começa no modelo, mas no problema, no contexto, no processo e na métrica. O site também diferencia demonstração de produto e automação de transformação real.

### Gestor 360

É o estudo de caso mais completo do projeto. Possui problema, arquitetura, capacidades, princípios, roadmap e colaboração Marcelo × Spock.

### Memória e Arquivo

São as áreas mais documentadas do sistema. Existem números, fontes externas, cronologia, protocolo de preservação, distinção entre restauração e reconstrução e política de proveniência.

### Ideias

Existem três ensaios atuais completos e quatro textos legados preservados em versões editoriais condensadas. A linha editorial é consistente com o posicionamento de IA aplicada e pensamento em público.

## 4. Lacunas de conteúdo prioritárias

### P0 — antes de promover para produção

1. **Revisão visual do Hero publicado**  
   Confirmar em desktop e mobile que o retrato correto aparece sem moldura, sem colisão com o título e com movimento preservado.

2. **Intelig.Cloud ainda não é um estudo de caso**  
   A página atual contém somente tese, introdução e conexões. Faltam:
   - problema original;
   - público ou operação atendida;
   - arquitetura;
   - agentes e ferramentas;
   - telas ou diagramas;
   - estado atual;
   - resultados observáveis;
   - próximos marcos.

3. **Amo Franca ainda não é um estudo de caso**  
   A página atual contém somente uma apresentação resumida. Faltam:
   - linha do tempo desde 2014;
   - função de Marcelo;
   - evolução de comunidade para portal;
   - acervos e exposições;
   - números sempre acompanhados de data e fonte;
   - tecnologia e automação editorial;
   - modelo de sustentabilidade e próximos passos.

4. **Imagem social do site**  
   Open Graph e Twitter Cards estão configurados, mas não possuem uma imagem principal explícita. É necessário criar e versionar uma capa 1200 × 630 para a Home e, posteriormente, capas específicas para projetos e artigos.

5. **Pull Request ainda está em rascunho**  
   O staging não é produção. A branch precisa passar por revisão final, ser marcada como pronta e somente depois ser incorporada à `main`.

### P1 — autoridade e conversão

6. **Data incompleta na página de imprensa**  
   A matéria sobre o Supermercado Tiãozinho usa `VAREJO` no campo de data. O ano real deve ser confirmado antes da produção.

7. **Contato ainda é baseado em canais**  
   A nova página resolve a ausência da rota, mas não possui formulário com validação, antispam, consentimento e registro de origem. Isso pode ser implementado com Cloudflare Worker quando houver decisão operacional.

8. **Spock ainda não é uma experiência conversacional do site**  
   A página explica o método, mas o visitante ainda não consegue consultar o universo de Marcelo por meio de uma interface fundamentada no próprio conteúdo.

9. **Medição e aquisição**  
   Não há implementação consolidada de analytics, eventos, Search Console, Bing Webmaster Tools ou acompanhamento de conversão. Esses recursos precisam respeitar privacidade e só devem ser ativados na produção.

10. **Inventário completo de projetos**  
    O site apresenta Intelig.Cloud, Gestor 360, Amo Franca e Fradim.com.br 2.0. Outros produtos ou iniciativas só devem entrar quando o estado público, a autoria, a finalidade e o nível de maturidade forem confirmados.

### P2 — acervo e expansão editorial

11. **Arquivo de campanhas ainda sem assets**  
    A ausência é intencional. Os trabalhos antigos precisam retornar um a um, com origem, autoria, cliente, período e autorização de uso.

12. **Três registros de memória continuam retidos ou rejeitados**  
    Isso é uma decisão de preservação, não falha do site. Imagens não devem ser publicadas sem proveniência ou quando houver marca de terceiro.

13. **Sistema editorial ainda está acoplado ao código**  
    Projetos, imprensa, cronologia e artigos estão definidos em TypeScript. Uma camada MDX/JSON ou CMS será necessária para publicação frequente sem editar componentes.

14. **Datas de atualização editorial**  
    Artigos e estudos de caso devem exibir data de publicação e atualização, principalmente em conteúdos sobre IA, cuja validade muda rapidamente.

## 5. Dados que ainda precisam de confirmação de Marcelo

Antes de aprofundar os estudos de caso, registrar de forma verificável:

- status público atual de cada projeto;
- URL oficial, quando houver;
- função exata de Marcelo em cada iniciativa;
- datas de início e marcos;
- números e resultados que podem ser publicados;
- clientes ou parceiros que podem ser citados;
- imagens, telas e marcas autorizadas;
- outras iniciativas que devem entrar no portfólio público;
- ano da reportagem do Tiãozinho atualmente sem data;
- canal preferencial e prazo esperado para resposta de contatos.

## 6. Critério de conclusão

O Fradim.com.br 2.0 estará pronto para produção quando:

- o Hero correto for confirmado visualmente no staging;
- o pipeline completo estiver verde;
- as rotas públicas críticas estiverem presentes;
- Intelig.Cloud e Amo Franca tiverem conteúdo suficiente para sustentar as afirmações do portfólio;
- a imagem social principal estiver definida;
- links externos e dados públicos forem revisados;
- o PR deixar de ser rascunho;
- o cutover Cloudflare for executado com o checklist de produção e plano de rollback.

## 7. Princípio de continuidade

O site não deve voltar a ser apenas um portfólio visual nem se transformar em uma coleção genérica de frases sobre inteligência artificial. Cada afirmação importante precisa apontar para uma evidência: projeto, sistema, texto, fonte externa, imagem com proveniência ou resultado verificável.

**Magic in the interface. Discipline in the architecture. Evidence in the narrative.**
