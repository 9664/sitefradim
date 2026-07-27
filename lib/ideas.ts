export type Idea = {
  slug: string;
  category: string;
  title: string;
  standfirst: string;
  readingTime: string;
  thesis: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const ideas: Idea[] = [
  {
    slug: "ia-de-ferramenta-a-infraestrutura",
    category: "INTELIGÊNCIA ARTIFICIAL",
    title: "IA não é mais ferramenta. Está se tornando infraestrutura.",
    standfirst: "A pergunta deixou de ser qual ferramenta de IA uma empresa deveria usar. A questão relevante é quais processos precisam ser redesenhados quando inteligência passa a fazer parte da própria operação.",
    readingTime: "6 min",
    thesis: "A próxima vantagem competitiva não será simplesmente usar IA. Será aprender a reorganizar trabalho, contexto e decisão a partir dela.",
    sections: [
      {
        heading: "Ferramentas são fáceis de trocar",
        paragraphs: [
          "Durante muito tempo tratamos tecnologia como uma coleção de ferramentas. Escolhíamos um software para design, outro para atendimento, outro para gestão e aprendíamos a operar cada um deles. A inteligência artificial começou seguindo o mesmo padrão: mais uma janela aberta ao lado das demais.",
          "Esse estágio foi importante, mas é transitório. Quando uma tecnologia consegue interpretar linguagem, consultar informação, gerar conteúdo, escrever código, acionar ferramentas e participar de decisões, ela deixa de caber confortavelmente na categoria de aplicativo. Ela começa a se comportar como uma camada de infraestrutura.",
        ],
      },
      {
        heading: "A mudança real acontece no processo",
        paragraphs: [
          "Colocar IA em cima de um processo antigo pode trazer ganho de velocidade. Mas velocidade não é sinônimo de transformação. Se uma equipe copia dados entre sistemas, aprova o mesmo material em cinco lugares e perde contexto em mensagens espalhadas, automatizar apenas um desses passos pode preservar a arquitetura ruim.",
          "A pergunta mais interessante é anterior: por que esse processo existe dessa maneira? Quais decisões exigem julgamento humano? Quais dependem apenas de contexto bem organizado? Onde a informação se perde? O que poderia desaparecer completamente se o fluxo fosse redesenhado do zero?",
        ],
      },
      {
        heading: "Contexto passa a ser ativo operacional",
        paragraphs: [
          "Modelos de linguagem são impressionantes, mas não conhecem automaticamente as regras, exceções, objetivos e memória de uma organização. É por isso que Context Engineering se torna tão importante quanto escolher o modelo. A qualidade do sistema depende do que ele recebe, de quando recebe e de como esse contexto é mantido ao longo do trabalho.",
          "Documentação, dados, papéis, políticas, histórico de decisões e critérios de sucesso deixam de ser apenas arquivos administrativos. Tornam-se parte da infraestrutura que permite à inteligência artificial atuar com utilidade e limites claros.",
        ],
      },
      {
        heading: "Infraestrutura também exige governança",
        paragraphs: [
          "Quanto mais a IA participa da operação, menos sentido faz tratá-la como um experimento informal. Precisamos saber quais ações ela pode executar, quais exigem aprovação, quais fontes podem ser consultadas e como resultados serão auditados. Autonomia sem arquitetura não é inovação; é risco.",
          "O objetivo não é retirar o humano do sistema. É colocar responsabilidade humana exatamente onde julgamento, intenção, ética e consequência exigem presença — e deixar que a máquina assuma o que pode ser executado com segurança e repetibilidade.",
        ],
      },
      {
        heading: "O novo diferencial",
        paragraphs: [
          "Em pouco tempo, acesso a bons modelos será comum. O diferencial não estará em possuir a ferramenta, mas em ter processos, dados e cultura capazes de usá-la melhor. Empresas com contexto fragmentado e decisões mal definidas continuarão tendo problemas, ainda que utilizem a tecnologia mais avançada disponível.",
          "É por isso que considero IA uma discussão de desenho organizacional, não apenas de software. A tecnologia muda rápido. A capacidade de formular problemas, estruturar contexto e transformar aprendizado em processo é o que permanece.",
        ],
      },
    ],
  },
  {
    slug: "automatizar-processo-ruim",
    category: "PROCESSOS + AUTOMAÇÃO",
    title: "Automatizar um processo ruim é acelerar o problema.",
    standfirst: "Automação costuma começar pela pergunta errada: como fazer esta tarefa mais rápido? Antes disso, deveríamos perguntar se a tarefa ainda deveria existir.",
    readingTime: "5 min",
    thesis: "Eficiência aplicada ao desperdício continua sendo desperdício — apenas em maior velocidade.",
    sections: [
      {
        heading: "A sedução da velocidade",
        paragraphs: [
          "Automação é sedutora porque seus resultados aparecem rápido. Um relatório que levava horas passa a levar minutos. Uma mensagem é produzida em segundos. Um arquivo deixa de ser preenchido manualmente. O ganho é fácil de demonstrar e, por isso, tende a dominar a conversa.",
          "Mas existe uma diferença entre acelerar uma tarefa e melhorar um sistema. Quando olhamos apenas para tempo economizado, podemos deixar intactas aprovações desnecessárias, duplicidade de informação, decisões sem dono e fluxos criados para resolver limitações que já não existem.",
        ],
      },
      {
        heading: "Comece pelo mapa, não pelo robô",
        paragraphs: [
          "Antes de automatizar, gosto de mapear o caminho completo: de onde a demanda nasce, quem toca nela, quais informações entram, quais decisões acontecem, onde surgem esperas e o que define que o trabalho terminou. Muitas vezes o maior ganho não está em automatizar uma etapa, mas em eliminar duas ou três.",
          "Esse exercício muda o papel da IA. Ela deixa de ser apenas executora e pode atuar primeiro como ferramenta de diagnóstico: comparar variações, identificar padrões, organizar exceções e ajudar a tornar explícitas regras que estavam apenas na cabeça das pessoas.",
        ],
      },
      {
        heading: "Automação precisa de fronteiras",
        paragraphs: [
          "Nem toda decisão deveria ser automatizada. Processos envolvem diferentes níveis de risco, reversibilidade e impacto. Uma sugestão de texto pode aceitar grande autonomia. Uma decisão financeira, contratual ou que afete pessoas exige controles muito mais fortes.",
          "Uma arquitetura responsável define o que a IA recomenda, o que ela executa, o que precisa de aprovação e como o histórico é registrado. O desenho dessas fronteiras é tão importante quanto a automação em si.",
        ],
      },
      {
        heading: "A métrica correta não é quantidade de automações",
        paragraphs: [
          "Contar quantas tarefas foram automatizadas é uma métrica confortável, mas pouco informativa. Prefiro perguntar se o ciclo ficou menor, se erros diminuíram, se as pessoas recuperaram tempo para trabalho de maior valor e se a experiência final melhorou.",
          "A melhor automação pode ser aquela que ninguém percebe. Ela não existe para impressionar em uma apresentação; existe para remover atrito do sistema.",
        ],
      },
    ],
  },
  {
    slug: "context-engineering-alem-do-prompt",
    category: "CONTEXT ENGINEERING",
    title: "O prompt sozinho deixou de ser suficiente.",
    standfirst: "À medida que a IA sai de conversas isoladas e entra em sistemas reais, escrever uma boa instrução é apenas uma parte do problema. O desafio passa a ser construir o contexto certo, no momento certo.",
    readingTime: "6 min",
    thesis: "Prompt Engineering organiza a instrução. Context Engineering organiza o ambiente no qual a inteligência precisa operar.",
    sections: [
      {
        heading: "De uma resposta para um sistema",
        paragraphs: [
          "Um prompt pode funcionar muito bem em uma conversa e falhar quando repetido dentro de uma operação. A razão é simples: aplicações reais não dependem apenas da frase que enviamos ao modelo. Dependem de histórico, dados, regras, ferramentas, permissões, estado atual e critérios de sucesso.",
          "Quando começamos a construir agentes e fluxos persistentes, a pergunta deixa de ser apenas ‘como devo escrever isto?’ e passa a incluir ‘o que este sistema precisa saber para tomar uma boa decisão agora?’.",
        ],
      },
      {
        heading: "Contexto não é despejar informação",
        paragraphs: [
          "Dar mais informação não significa dar melhor contexto. Um modelo também pode se perder em documentos redundantes, regras conflitantes e dados sem prioridade. Context Engineering envolve seleção, estrutura, timing e hierarquia.",
          "Precisamos decidir o que é permanente, o que é específico daquela tarefa, o que deve ser recuperado de uma fonte externa e o que não deveria chegar ao modelo. Em muitos casos, saber excluir informação é tão importante quanto saber adicioná-la.",
        ],
      },
      {
        heading: "Cinco camadas que costumo observar",
        paragraphs: [
          "Objetivo: qual mudança ou decisão queremos produzir. Contexto: qual histórico e situação atual importam. Restrições: quais limites o sistema não pode ultrapassar. Fontes: em quais evidências ele pode confiar. Critério de sucesso: como saberemos que a saída é boa o bastante para seguir adiante.",
          "Essas camadas não são uma fórmula universal. Funcionam como uma disciplina de projeto. Elas obrigam a transformar expectativas vagas em elementos que podem ser discutidos, testados e melhorados.",
        ],
      },
      {
        heading: "Memória e responsabilidade",
        paragraphs: [
          "Sistemas persistentes acrescentam outra dificuldade: memória. O que vale a pena lembrar? Por quanto tempo? O que pode mudar? Uma decisão antiga ainda é válida? Uma preferência continua relevante? Memória sem gestão pode transformar contexto útil em ruído acumulado.",
          "Também precisamos preservar responsabilidade. Contexto não deve servir para esconder decisões dentro de uma caixa-preta. Quanto mais um sistema conhece e executa, mais importante se torna registrar de onde veio a informação e por que uma ação foi tomada.",
        ],
      },
      {
        heading: "A próxima habilidade",
        paragraphs: [
          "Aprender a escrever bons prompts continua valioso. Mas acredito que a habilidade mais importante será desenhar ambientes de informação nos quais humanos e modelos consigam trabalhar com clareza. Isso envolve produto, dados, processo, interface e governança — não apenas linguagem.",
          "O prompt é a porta de entrada. O contexto é o edifício inteiro.",
        ],
      },
    ],
  },
];

export function getIdea(slug: string) {
  return ideas.find((idea) => idea.slug === slug);
}
