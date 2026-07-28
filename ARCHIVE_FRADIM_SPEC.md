# Arquivo Fradim — Especificação Editorial e Técnica

## 1. Propósito

O Arquivo Fradim transforma o legado digital legítimo de Marcelo Fradim em patrimônio editorial, profissional e cultural.

Ele não deve funcionar como um depósito de posts antigos. Deve organizar evidências reais de trajetória, criação, campanhas, pesquisa, tecnologia, memória e experimentação.

A seção precisa responder:

1. O que Marcelo construiu ao longo do tempo?
2. Como sua atuação evoluiu de criatividade, design e marketing para tecnologia, estratégia e inteligência artificial?
3. Quais documentos, imagens, campanhas e textos comprovam essa trajetória?

## 2. Rota e posição na arquitetura

Rota canônica principal:

```text
/arquivo
```

Rotas editoriais sugeridas:

```text
/arquivo/linha-do-tempo
/arquivo/campanhas
/arquivo/design-e-marcas
/arquivo/textos
/arquivo/fotografia
/arquivo/projetos
/arquivo/memoria-digital
/arquivo/[slug]
```

O Arquivo Fradim deve se conectar a:

- `/trajetoria`, como evidência cronológica;
- `/projetos`, como origem ou evolução dos trabalhos atuais;
- `/memoria`, para fotografia histórica e preservação cultural;
- `/ideias`, para textos autorais e reflexões;
- `/spock`, quando houver releituras, restaurações ou análises feitas em colaboração com IA.

## 3. Princípio de curadoria

Todo item legado deve receber uma decisão explícita:

### PRESERVAR

Conteúdo autoral, histórico, profissional ou documental cuja origem seja verificável.

### REINTERPRETAR

Conteúdo legítimo que precisa de nova contextualização, revisão textual, atualização visual ou apresentação editorial contemporânea.

### REDIRECIONAR

URL antiga com valor histórico, backlinks, tráfego ou indexação, mas cujo conteúdo será incorporado a uma nova página canônica.

### QUARENTENA

Arquivo ou registro de procedência incerta, incompleto, duplicado ou potencialmente contaminado.

### ELIMINAR

Spam, cassino, conteúdo injetado, páginas sem autoria legítima, scripts, executáveis, plugins, temas e uploads suspeitos.

Nenhum conteúdo deve ser publicado automaticamente a partir do banco WordPress comprometido.

## 4. Tipos de conteúdo

### 4.1 Marco de trajetória

Exemplos:

- mudança de área profissional;
- entrada em uma empresa relevante;
- lançamento de projeto;
- criação de marca;
- início de pesquisa histórica;
- adoção de IA no processo criativo e estratégico.

Campos mínimos:

```text
título
ano ou data
resumo
contexto
papel de Marcelo
evidências relacionadas
fontes
status de verificação
```

### 4.2 Campanha

Campos mínimos:

```text
título
cliente ou organização
ano
objetivo
problema
solução criativa
papel de Marcelo
peças relacionadas
resultado conhecido
observações históricas
```

### 4.3 Identidade visual e marca

Campos mínimos:

```text
nome do projeto
cliente
ano
categoria
conceito
aplicações
imagens originais
contexto atual
```

### 4.4 Texto autoral

Campos mínimos:

```text
título
data original
tipo
texto preservado
nota editorial atual
origem
URL antiga
```

### 4.5 Fotografia e memória

Campos mínimos:

```text
título
data aproximada
local
origem da imagem
autoria quando conhecida
descrição histórica
intervenções de restauração
nível de certeza
restrições de uso
```

### 4.6 Projeto digital ou experimental

Campos mínimos:

```text
título
período
problema
tecnologias
papel de Marcelo
resultado
estado atual
aprendizados
```

## 5. Experiência visual

O Arquivo deve parecer uma combinação de:

- arquivo de criação;
- exposição digital;
- linha do tempo viva;
- gabinete de memória;
- documentação profissional verificável.

A navegação pode usar profundidade, camadas e transições espaciais, mas o conteúdo principal deve permanecer em HTML semântico.

Elementos sugeridos:

- linha do tempo navegável por décadas;
- filtros por tema, cliente, área e período;
- comparação entre peça original e releitura atual;
- fichas de procedência;
- relações entre pessoas, empresas, projetos e cidades;
- modo galeria para imagens;
- modo documento para textos e registros;
- destaque visual para itens ainda em investigação.

## 6. Modelo de procedência

Cada item deve possuir um bloco de procedência visível ou acessível:

```text
Origem
Data de criação
Data de digitalização
Autor ou responsável
Arquivo original
URL anterior
Estado de preservação
Intervenções realizadas
Nível de certeza
Direitos e permissão de uso
```

Níveis de certeza:

```text
confirmado
provável
aproximado
não confirmado
```

A ausência de informação deve ser declarada, nunca preenchida por suposição.

## 7. SEO e dados estruturados

Utilizar conforme o tipo:

- `CreativeWork`
- `Article`
- `ImageObject`
- `Photograph`
- `VisualArtwork`
- `WebPage`
- `BreadcrumbList`
- `Person`
- `Organization`

Todo item autoral deve apontar para a entidade canônica de Marcelo Fradim.

URLs antigas legítimas devem receber:

- `301` quando houver substituto canônico;
- `410` somente quando o conteúdo for comprovadamente ilegítimo ou sem valor;
- preservação em `200` quando a URL tiver relevância própria e puder ser reconstruída com segurança.

## 8. Segurança da migração

Nunca importar diretamente:

- PHP;
- JavaScript do legado;
- plugins;
- temas;
- arquivos executáveis;
- arquivos compactados desconhecidos;
- SVG sem sanitização;
- HTML com scripts ou iframes;
- uploads sem extensão confiável;
- metadados com links de cassino, apostas, medicamentos ou domínios desconhecidos.

Textos devem ser extraídos como texto puro ou Markdown sanitizado.

Imagens devem ser:

1. verificadas por tipo real do arquivo;
2. recodificadas em ambiente limpo;
3. despojadas de metadados desnecessários;
4. associadas a uma ficha de procedência;
5. armazenadas fora do diretório legado.

## 9. Pipeline editorial

```text
Descoberta
→ classificação
→ verificação de autoria
→ verificação de procedência
→ limpeza e normalização
→ enriquecimento editorial
→ revisão humana
→ publicação
→ redirecionamento da URL antiga
```

Nenhuma etapa de publicação deve ocorrer sem revisão humana.

## 10. Coleções iniciais

Primeira coleção a ser reconstruída:

### Campanhas e portfólio legado

Rotas antigas identificadas como candidatas legítimas:

```text
/portfolio/
/port/campanhas/
/port/logomarcas/
/port/outdoors/
/port/internacionais/
/port/embalagens/
```

### Publicações e histórias

Rotas antigas identificadas como candidatas legítimas:

```text
/revista/
/hipolito/
```

Essas rotas ainda precisam de validação individual antes da publicação.

## 11. Critérios de aceite

O Arquivo Fradim estará pronto para lançamento quando:

1. todo item publicado tiver autoria e procedência registradas;
2. nenhum arquivo executável ou código do WordPress legado tiver sido migrado;
3. todas as URLs antigas avaliadas tiverem decisão documentada;
4. os conteúdos legítimos estiverem organizados por coleção e período;
5. cada item possuir versão acessível e indexável sem WebGL;
6. imagens e documentos tiverem sido reprocessados em ambiente limpo;
7. conteúdos em dúvida permanecerem em quarentena;
8. a experiência revelar trajetória e não apenas acumular arquivos.

## 12. Princípio editorial final

> O passado não será republicado como estava. Será preservado, contextualizado e transformado em evidência viva da trajetória de Marcelo Fradim.
