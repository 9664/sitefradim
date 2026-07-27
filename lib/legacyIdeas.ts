export type LegacyIdeaEntry = {
  slug: string;
  title: string;
  theme: string;
  summary: string;
  core: string[];
  currentReading: string;
  archiveNote: string;
};

export const legacyIdeaEntries: LegacyIdeaEntry[] = [
  {
    slug: "somos-simples-naufragos",
    title: "Somos simples náufragos",
    theme: "ESCOLHAS · APRENDIZADO · AUTONOMIA",
    summary:
      "Uma reflexão de uma fase mais pessoal da escrita sobre a sensação de atravessar a vida com recursos incompletos, aprendendo a decidir enquanto o caminho ainda está sendo construído.",
    core: [
      "O texto usa a imagem do náufrago como metáfora para uma condição humana recorrente: ninguém recebe um mapa completo antes de começar. Conhecimento, experiência e relações são acumulados durante a própria travessia.",
      "A questão central não é isolamento, mas responsabilidade. Mesmo cercados por referências e conselhos, continuamos precisando decidir o que fazer com aquilo que sabemos, com o que ainda ignoramos e com as consequências das próprias escolhas.",
    ],
    currentReading:
      "Relido hoje, o ensaio ajuda a mostrar uma linha que continuou presente nos trabalhos posteriores: aprender fazendo, testar hipóteses no mundo real e aceitar que clareza costuma aparecer durante o processo, não antes dele.",
    archiveNote:
      "Esta página preserva a ideia e o endereço do texto antigo em forma condensada. Não é uma reprodução integral da publicação original.",
  },
  {
    slug: "nada-acontece-por-acaso",
    title: "Nada acontece por acaso",
    theme: "COINCIDÊNCIA · SENTIDO · DECISÃO",
    summary:
      "Um ensaio sobre coincidências, encontros e a maneira como construímos sentido retrospectivamente a partir de acontecimentos que, no momento em que ocorrem, ainda parecem desconectados.",
    core: [
      "A reflexão parte da atração humana por acontecimentos que parecem se encaixar de maneira improvável. Mais importante do que provar uma explicação invisível para essas coincidências é observar como elas reorganizam atenção, escolhas e narrativas pessoais.",
      "O texto também toca em uma tensão que permanece atual: reconhecemos padrões porque eles realmente existem ou porque nossa mente precisa conectar pontos? Entre acaso e intenção, muita coisa só ganha significado depois que uma decisão muda o rumo seguinte.",
    ],
    currentReading:
      "Hoje eu preservaria essa reflexão menos como uma afirmação sobre destino e mais como registro de uma pergunta: como distinguir sinal, coincidência e interpretação quando tomamos decisões com informação incompleta?",
    archiveNote:
      "O conteúdo aqui foi reescrito de forma editorial e resumida a partir do tema central do post legado. O texto completo antigo não foi importado do WordPress.",
  },
  {
    slug: "porque-o-tempo-nao-para-nos-tornamos-velhos",
    title: "Porque o tempo não para, nos tornamos velhos?",
    theme: "TEMPO · IDENTIDADE · ENVELHECIMENTO",
    summary:
      "Uma reflexão sobre envelhecimento que procura separar passagem cronológica do tempo, percepção de si e as narrativas que criamos sobre o que significa ficar mais velho.",
    core: [
      "O ensaio questionava a ideia de que envelhecer possa ser reduzido a uma simples contagem de anos. Corpo, memória, desejo, medo e identidade avançam em ritmos diferentes, e a experiência de idade não cabe inteira em uma data no calendário.",
      "A reflexão também tratava do modo como expectativas sociais moldam nossa leitura das fases da vida. Algumas limitações são reais; outras são antecipadas porque aprendemos a imaginar determinados comportamentos como próprios de uma idade.",
    ],
    currentReading:
      "No arquivo atual, o texto permanece como registro de uma inquietação pessoal, não como tese psicológica ou médica. O valor está na pergunta sobre identidade e tempo, não em transformar referências usadas na publicação antiga em autoridade definitiva.",
    archiveNote:
      "Esta versão não reproduz citações ou passagens de autores mencionados no post original. Ela preserva apenas a reflexão autoral em forma resumida.",
  },
  {
    slug: "a-diferenca-entre-vida-simples-minimalismo-e-frugalidade",
    title: "A diferença entre vida simples, minimalismo e frugalidade",
    theme: "SIMPLICIDADE · CONSUMO · INTENÇÃO",
    summary:
      "Um texto que comparava ideias próximas — simplicidade voluntária, minimalismo e frugalidade — para discutir como reduzir complexidade desnecessária sem transformar estilos de vida em rótulos rígidos.",
    core: [
      "As três abordagens podem levar a escolhas parecidas, mas partem de ênfases diferentes. Minimalismo tende a questionar excesso e quantidade; frugalidade observa uso consciente de recursos; vida simples amplia a discussão para ritmo, prioridades e relação com consumo e trabalho.",
      "O ponto que atravessa o texto é menos estético do que prático: simplificar não significa obedecer a uma fórmula. Significa identificar o que adiciona complexidade sem acrescentar valor e decidir conscientemente o que merece permanecer.",
    ],
    currentReading:
      "Essa ideia continua útil quando aplicada também a sistemas e processos: retirar etapas, ferramentas ou compromissos pode ser tão importante quanto adicionar capacidade. Simplicidade não é ausência; é escolha deliberada.",
    archiveNote:
      "O post antigo utilizava referências e definições de diferentes autores. Esta versão evita reproduzi-las e mantém somente uma síntese autoral do tema.",
  },
];

export function getLegacyIdeaEntry(slug: string) {
  return legacyIdeaEntries.find((entry) => entry.slug === slug);
}
