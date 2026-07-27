# FRADIM.COM.BR 2.0 — MASTER SPEC

## 1. North Star

Fradim.com.br is not a conventional portfolio or résumé website. It is a living digital experience about the intersection of human creativity, artificial intelligence, technology, business, culture and memory.

The site must make visitors want to answer two questions:

1. Who is Marcelo Fradim?
2. Who is Spock, and what happens when a human and an AI learn to build together?

The project must be globally distinctive in experience, while remaining technically disciplined, accessible, fast, indexable and useful.

> Magic in the interface. Discipline in the architecture.

## 2. Positioning

Primary identity:

**Marcelo Fradim — Artificial Intelligence, Innovation & Business**

Core thesis:

> The next competitive advantage will not be simply using AI. It will be learning to redesign processes around it.

Marcelo's story is not "someone who started with AI". It is an evolution across decades:

**Creativity → Design → Marketing → Technology → Strategy → Artificial Intelligence**

Important domains of authority:

- Artificial Intelligence applied to business
- Prompt Engineering and Context Engineering
- AI agents and automation
- Vibe Coding and AI-assisted development
- Digital products and SaaS
- Marketing, brand and retail strategy
- Digital transformation
- Generative AI and creative processes
- Culture, collective memory and historical preservation

## 3. The Marcelo + Spock Narrative

Marcelo is the human: context, experience, intuition, creative direction, judgment and vision.

Spock is artificial intelligence: analysis, research, structure, challenge, synthesis and computational leverage.

The site must never falsely present Spock as a human being or imply independent personhood. The value of the narrative comes from the explicit difference between human and AI.

Editorial premise:

> Not replacing human thought. Expanding the ability to think.

The relationship may appear as conversations, experiments, design decisions, research notes and project retrospectives.

## 4. Experience Architecture

The website should feel closer to an interactive digital installation than a template-driven personal site.

Primary territories:

### MARCELO
- Who I am
- Trajectory
- Thinking
- Professional authority

### SPOCK
- What Spock is
- Human + AI collaboration
- Selected conversations
- Method
- Experiments

### LAB
- AI experiments
- Agents
- Prototypes
- Vibe coding
- Interactive demos
- Research notes

### WORK
- Intelig.Cloud
- Amo Franca
- Gestor 360
- Tiãozinho / retail innovation
- Other relevant products and projects

### IDEAS
- Essays
- Articles
- Provocations
- Research
- Marcelo + Spock dialogues

### MEMORY
- Historical photography
- Digital preservation
- Franca
- AI-assisted historical reconstruction
- Cultural projects

### PRESS
- Interviews
- Articles about Marcelo
- Events
- Talks
- Recognition
- Independent references

## 5. Home — Cinematic Sequence

### Scene 0 — Arrival

Dark, minimal environment.

A single point of light appears.

Connections form slowly.

**MARCELO FRADIM**

**Human Creativity × Artificial Intelligence**

Discrete action: `ENTER`

The intro must be skippable, short and respectful of `prefers-reduced-motion`.

### Scene 1 — Dual Presence

Two visual anchors emerge:

- M — Marcelo
- S — Spock

They should not be literal avatars. Prefer abstract, premium visual language based on light, geometry, particles, typography and spatial relationships.

### Scene 2 — The Universe

Territories appear as a navigable constellation or spatial knowledge graph.

Each territory has semantic meaning and real content behind it.

### Scene 3 — Thesis

Large editorial statement:

> The next competitive advantage will not be simply using AI. It will be learning to redesign processes around it.

### Scene 4 — Evidence

Show real projects, ideas, external references and measurable work.

Never rely only on self-declared titles.

### Scene 5 — Invitation

Invite the visitor to explore Marcelo, Spock, Lab, Work, Ideas and Memory.

## 6. 3D Design Principles

3D is a navigation and storytelling system, not decoration.

Rules:

- No generic robots, glowing brains or cyberpunk clichés.
- No gratuitous particle overload.
- No interaction that requires precision mouse control to access essential content.
- No important text rendered only inside WebGL/canvas.
- Every immersive route must have a semantic HTML equivalent.
- 3D effects must progressively enhance the experience.
- Mobile receives a purpose-built interaction model, not a reduced desktop scene.
- Respect reduced motion, low-power devices and slow connections.

Visual direction:

- Executive + experimental laboratory + technology editorial
- Dark graphite / neutral foundations
- Light as an information system
- Large typography
- Controlled depth
- Refined motion
- Sparse but meaningful color
- High-quality portrait photography

## 7. Technical Architecture

Preferred stack:

- Next.js 16 Active LTS
- React 19
- TypeScript
- App Router
- React Three Fiber 9
- Three.js
- Drei where justified
- Motion / GSAP only when clearly needed
- CSS variables + Tailwind or a small token-driven styling layer
- MDX or headless content source for editorial content

Architecture rule:

**HTML first. WebGL enhancement second.**

All critical content must be server-rendered or statically rendered and available without executing the 3D layer.

3D scenes should be dynamically loaded only when useful.

## 8. Performance Budgets

Target, not aspiration:

- Excellent Core Web Vitals on editorial pages
- Avoid 3D code in routes that do not need it
- Lazy-load heavy scenes
- Compress GLB/GLTF assets
- Use modern image formats
- No autoplay video as a hero dependency
- Provide static/poster fallback for cinematic scenes
- Maintain usable experience without WebGL
- Favor 60fps interaction on capable devices, degrading gracefully on weaker devices

The homepage may be visually ambitious, but it must not become a performance demo that sacrifices usability.

## 9. SEO and Machine Understanding

Fradim.com.br should become the canonical source for the entity "Marcelo Fradim".

Every important page must provide semantic, crawlable content.

Structured data plan:

- `ProfilePage`
- `Person`
- `Article`
- `BlogPosting` when appropriate
- `CreativeWork`
- `Organization` for relevant projects
- Breadcrumb structured data

The `Person` entity should connect verified official profiles with `sameAs`.

Core entity:

```text
Person: Marcelo Fradim
knowsAbout:
  Artificial Intelligence
  Innovation
  Marketing
  AI Agents
  Automation
  Prompt Engineering
  Context Engineering
  Vibe Coding
  Digital Transformation
  Generative AI
```

Articles must link their authorship back to the canonical Marcelo entity.

## 10. Information Architecture

Initial canonical routes:

```text
/
/sobre
/spock
/inteligencia-artificial
/trajetoria
/projetos
/projetos/intelig-cloud
/projetos/amo-franca
/projetos/gestor-360
/lab
/ideias
/imprensa
/memoria
/contato
```

Route names may be revised after keyword and content analysis, but the semantic hierarchy must remain stable.

## 11. Content Migration

The old WordPress environment must be treated as potentially compromised.

Do not migrate the old database wholesale.

Preserve selectively:

- legitimate historical photographs
- legitimate authored articles
- media citations
- valuable indexed URLs
- metadata needed for redirects

For valuable legacy URLs, create explicit 301 mappings.

Do not import plugins, themes, executables, unknown uploads or suspicious content from the previous installation.

## 12. Security Principles

- Clean new runtime and deployment
- Repository-based deployment
- No shared credentials from the old WordPress environment
- Rotate hosting, CMS, database, SSH/SFTP and admin credentials before cutover
- Minimal dependencies
- Dependency update policy
- Security headers
- CSP where practical
- No secrets committed to Git
- Automated dependency/security checks

## 13. Accessibility

The immersive experience must remain inclusive.

Requirements:

- Keyboard navigation
- Visible focus states
- Screen-reader accessible semantic structure
- `prefers-reduced-motion`
- Contrast compliance
- Text alternatives for meaningful visuals
- No essential information communicated by motion or color alone
- A non-WebGL route through all primary content

## 14. Editorial Model

Preferred content types:

- Marcelo essay
- Marcelo + Spock dialogue
- Project case study
- Experiment
- Research note
- Press reference
- Timeline milestone

Editorial standard:

Show evidence, reasoning and outcomes. Avoid generic AI thought-leadership language.

Prefer:

> We built X. Here is what happened.

Over:

> AI is changing everything.

## 15. Success Criteria

The site succeeds when:

1. A first-time visitor is curious enough to explore beyond the homepage.
2. A journalist can quickly understand and verify who Marcelo Fradim is.
3. Google and AI systems can reliably associate Marcelo with AI, innovation, business, marketing, technology, culture and the projects he actually built.
4. The 3D experience is memorable without harming accessibility or performance.
5. The site becomes a platform for ongoing experiments, not a static biography.
6. Marcelo and Spock develop a recognizable editorial and interaction language that cannot be confused with a generic AI portfolio.

## 16. Build Principle

Every major feature must answer three questions:

1. Does it make the experience more meaningful?
2. Does it help explain Marcelo, Spock or their work?
3. Can it remain fast, accessible and indexable?

If the answer to any of these is no, the feature should be redesigned or removed.
