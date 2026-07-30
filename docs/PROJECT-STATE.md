# Fradim.com.br 2.0 — Estado de continuidade

Atualizado em 30 de julho de 2026.

Este documento é a fonte de continuidade operacional para qualquer nova conversa, agente ou sessão que trabalhe no Fradim.com.br 2.0.

## Repositório e ambiente

- Repositório: `9664/sitefradim`
- Branch de trabalho: `agent/immersive-foundation`
- Pull request principal: `#1 — Fradim.com.br 2.0 — immersive identity system`
- Staging: `https://9664.github.io/sitefradim/`
- `main`, DNS e produção não devem ser alterados sem autorização explícita de Marcelo Fradim.

## Regra de retomada

Antes de responder sobre o próximo lote ou pedir qualquer material ao usuário:

1. Ler este arquivo.
2. Inspecionar `lib/recoveredMemoryBatch*.ts`.
3. Inspecionar os commits recentes da branch `agent/immersive-foundation`.
4. Verificar `config/legacy-wxr-recovery-2026-07-29.json`, `config/legacy-media.json` e `config/legacy-media-published.json`.
5. Usar o repositório como fonte de verdade e não pedir reenvio de arquivos que já estejam versionados.

## Padrão editorial e técnico dos lotes

Cada lote reúne três memórias.

- Preservar título, data e identificação do acervo original.
- Não inventar autoria, endereço, pessoas ou contexto não documentado.
- Distinguir fotografia histórica, restauração e interpretação colorizada.
- Registrar proveniência, origem WordPress, anexos, arquivos físicos e SHA-256.
- Publicar apenas derivados validados e sem metadados herdados.
- Integrar página, índice de Memória, sitemap, auditoria visual e manifesto de mídia.

## Lotes concluídos

### Lote 2 — Pessoas, trilhos e horizontes

1. Padre Alonso Ferreira de Carvalho — 1926
2. Estação Mogiana em 1930
3. Vista aérea de Franca em 1950

Fonte: `lib/recoveredMemoryBatch2.ts`.

### Lote 3 — Ruas, comércio e mobilidade

1. Rua do Comércio em 1908
2. Empório Cruzeiro do Sul em 1952
3. Táxis na Praça Barão — década de 1950

Fonte: `lib/recoveredMemoryBatch3.ts`.

### Lote 4 — A cidade vista de cima, por dentro e em convivência

1. Franca em 1928
2. Casa Andrade em 1924
3. Bar Tubarão — década de 1960

Fonte: `lib/recoveredMemoryBatch4.ts`.

O Lote 4 já está integrado. Não deve ser tratado como aberto ou pendente.

## Estado atual

- O índice recuperado de Memória possui nove cards distribuídos nos Lotes 2, 3 e 4.
- O Lote 4 foi integrado pelo commit `ee954ab` (`Lote 4: integrar panorama, comércio e convivência`).
- A branch principal de trabalho está no PR #1.
- O commit de referência observado em 30/07/2026 é `ef50fa6`, que alinhou o derivado real dos Táxis no manifesto.
- O WXR auditado possui 85 posts legítimos para revisão editorial; nenhum conteúdo deve ser importado ou publicado automaticamente.

## Próximo passo correto

Iniciar o Lote 5 a partir do material já existente e da fila editorial do repositório.

Procedimento:

1. Identificar três memórias ainda não integradas.
2. Confirmar que seus arquivos e variantes estão presentes no acervo versionado ou inventariado.
3. Validar proveniência, formato, dimensões, metadados e SHA-256.
4. Criar `lib/recoveredMemoryBatch5.ts` e as três rotas correspondentes.
5. Atualizar índice, sitemap, materialização, manifestos e auditorias.
6. Rodar validação e staging antes de considerar o lote concluído.

Não pedir ao usuário que envie novamente imagens ou informações já presentes no repositório.
