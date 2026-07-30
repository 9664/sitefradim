"use client";

import { useMemo, useState } from "react";
import styles from "./ContextLab.module.css";

const layers = [
  {
    id: "objective",
    index: "01",
    name: "Objetivo",
    label: "O que precisa mudar?",
    content: "OBJETIVO\nTransformar uma ideia em um plano executável, com prioridade, escopo e próximo passo claros.",
  },
  {
    id: "context",
    index: "02",
    name: "Contexto",
    label: "O que a IA precisa saber?",
    content: "CONTEXTO\nConsidere o histórico do projeto, decisões anteriores, público, recursos disponíveis e estágio atual.",
  },
  {
    id: "constraints",
    index: "03",
    name: "Restrições",
    label: "Quais limites importam?",
    content: "RESTRIÇÕES\nNão invente fatos, preserve o que já funciona e diferencie hipótese, evidência e decisão.",
  },
  {
    id: "sources",
    index: "04",
    name: "Fontes",
    label: "Em que evidência confiar?",
    content: "FONTES\nUse dados do projeto e referências verificáveis. Quando algo puder ter mudado, confirme antes de afirmar.",
  },
  {
    id: "success",
    index: "05",
    name: "Sucesso",
    label: "Como saber que terminou?",
    content: "CRITÉRIO DE SUCESSO\nA saída deve permitir uma decisão ou ação concreta, revelar riscos e indicar o próximo teste.",
  },
] as const;

type LayerId = (typeof layers)[number]["id"];

export function ContextLab() {
  const [active, setActive] = useState<LayerId[]>(["objective"]);

  const toggle = (id: LayerId) => {
    setActive((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const packet = useMemo(() => {
    const selected = layers.filter((layer) => active.includes(layer.id));
    if (selected.length === 0) return "Selecione uma ou mais camadas para construir o contexto.";
    return selected.map((layer) => layer.content).join("\n\n");
  }, [active]);

  return (
    <div className={styles.lab}>
      <div className={styles.controls}>
        <p className={styles.hint}>ATIVE CAMADAS</p>
        {layers.map((layer) => {
          const selected = active.includes(layer.id);
          return (
            <button
              key={layer.id}
              type="button"
              className={selected ? styles.active : undefined}
              onClick={() => toggle(layer.id)}
              aria-pressed={selected}
            >
              <span>{layer.index}</span>
              <div><strong>{layer.name}</strong><small>{layer.label}</small></div>
              <i aria-hidden="true">{selected ? "ON" : "OFF"}</i>
            </button>
          );
        })}
      </div>

      <div className={styles.output}>
        <div className={styles.outputHead}>
          <span>CONTEXT PACKET / LOCAL DEMO</span>
          <span>{active.length}/5 CAMADAS</span>
        </div>
        <pre>{packet}</pre>
        <p>Este experimento não chama nenhum modelo de IA. Ele demonstra, localmente, como contexto muda a especificidade de uma instrução.</p>
      </div>
    </div>
  );
}
