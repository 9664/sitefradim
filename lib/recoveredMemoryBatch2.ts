export type RecoveredMemoryEntry = {
  slug: string;
  title: string;
  year: string;
  location: string;
  originalPublishedAt: string;
  summary: string;
  context: string[];
  intervention: string;
  sourceNote: string;
  sourceLabel?: string;
  sourceHref?: string;
  image: {
    src: string;
    alt: string;
    caption: string;
    provenance: string;
  };
  mediaNote: string;
};

export const recoveredMemoryBatch2: RecoveredMemoryEntry[] = [
  {
    slug: "padre-alonso-1926",
    title: "Padre Alonso Ferreira de Carvalho — 1926",
    year: "1926",
    location: "Franca, SP",
    originalPublishedAt: "8 de outubro de 2014",
    summary:
      "Um retrato de Padre Alonso retorna ao acervo como documento da memória francana e como registro de uma das primeiras experiências de Marcelo Fradim com restauração de pessoas.",
    context: [
      "O texto recuperado do antigo Fradim.com.br apresenta Padre Alonso Ferreira de Carvalho como personagem ligado aos primórdios da atividade coureira em Franca e à trajetória que antecedeu a consolidação da indústria calçadista local.",
      "A publicação antiga também reproduzia uma memória popular segundo a qual Padre Alonso ajudava pessoas pobres e cobrava juros dos mais ricos. No 2.0, esse relato permanece identificado como narrativa do acervo legado, não como fato histórico documentalmente comprovado.",
      "O post original foi publicado em 8 de outubro de 2014 e estava relacionado ao anexo 790, preservado no caminho 2013/06/PADRE-ALONSO.jpg.",
    ],
    intervention:
      "O arquivo reúne o retrato envelhecido e sua versão restaurada e colorizada. A intervenção recupera leitura do rosto, das vestes e do fundo, preservando a comparação entre a evidência fotográfica e a interpretação visual.",
    sourceNote:
      "Fonte primária: post 1449, anexo 790, metadados do WordPress e arquivo físico localizado no backup privado de uploads. As informações biográficas reproduzidas pelo post antigo continuam classificadas como pistas de pesquisa até serem confrontadas com documentação independente.",
    image: {
      src: "/memoria/arquivo/padre-alonso-1926.webp",
      alt: "Comparativo do retrato de Padre Alonso em 1926, antes e depois da restauração e colorização de Marcelo Fradim.",
      caption: "Padre Alonso Ferreira de Carvalho, 1926: fotografia preservada e interpretação restaurada/colorizada por Marcelo Fradim.",
      provenance:
        "Mestre recuperado do backup privado de wp-content/uploads e vinculado ao post 1449 e ao anexo 790. Derivado WebP publicado após validação de formato, hash SHA-256 e remoção dos metadados herdados.",
    },
    mediaNote:
      "Asset reintegrado com o comparativo original/restauração. O relato biográfico permanece acompanhado de sua condição documental.",
  },
  {
    slug: "estacao-em-1930",
    title: "Estação Mogiana em 1930",
    year: "1930",
    location: "Plataforma da Estação Mogiana, Franca, SP",
    originalPublishedAt: "25 de agosto de 2014",
    summary:
      "A locomotiva 404 aguarda o embarque de passageiros na plataforma da Estação Mogiana em uma cena que devolve movimento à Franca ferroviária.",
    context: [
      "O texto preservado do WordPress identifica a cena como a plataforma de passageiros da Estação Mogiana de Franca, com a locomotiva 404 aguardando o embarque de seus usuários em 1930.",
      "O registro ajuda a compreender a estação não apenas como edifício, mas como infraestrutura cotidiana: pessoas, cargas, horários, deslocamentos e conexões que participaram da expansão urbana de Franca.",
      "A publicação original foi registrada em 25 de agosto de 2014 e estava vinculada ao post 1457 e ao anexo 785.",
    ],
    intervention:
      "A colorização digital recupera separação visual entre locomotiva, plataforma, cobertura, passageiros e edificações. As cores são apresentadas como interpretação, sem substituir a fotografia histórica como documento.",
    sourceNote:
      "Fonte primária: post 1457, anexo 785 e arquivo físico 2013/06/Decada-de-30-Estação-final-p.jpg. O contexto ferroviário geral é relacionado ao histórico institucional da antiga Mogiana preservado pela Prefeitura de Franca.",
    sourceLabel: "Prefeitura de Franca — histórico da antiga Mogiana",
    sourceHref: "https://www3.franca.sp.gov.br/noticia/26039/antiga-mogiana.html",
    image: {
      src: "/memoria/arquivo/estacao-mogiana-1930.webp",
      alt: "Locomotiva 404 na plataforma da Estação Mogiana de Franca em 1930, em versão colorizada por Marcelo Fradim.",
      caption: "Plataforma da Estação Mogiana de Franca, 1930, com a locomotiva 404. Colorização digital: Marcelo Fradim.",
      provenance:
        "Mestre localizado no backup privado de uploads e relacionado ao post 1457 e ao anexo 785. Derivado WebP validado por SHA-256 e publicado sem metadados herdados.",
    },
    mediaNote:
      "Asset reintegrado e conectado à sequência ferroviária já presente no Arquivo Temporal.",
  },
  {
    slug: "vista-aerea-de-franca-em-1950",
    title: "Vista aérea de Franca em 1950",
    year: "década de 1950",
    location: "Centro de Franca, SP",
    originalPublishedAt: "24 de janeiro de 2014",
    summary:
      "Uma vista aérea do centro de Franca torna visível a escala da cidade nos anos 1950 e preserva o trabalho que Marcelo identificava como sua primeira colorização.",
    context: [
      "O texto original era breve e direto: Marcelo registrou esta vista aérea do centro de Franca em 1950 como sua primeira experiência de colorização.",
      "A composição recuperada mantém a fotografia em preto e branco ao lado da interpretação colorizada, permitindo observar a malha urbana, as quadras, a verticalização ainda inicial e a presença das igrejas como referências visuais da cidade.",
      "A data editorial original, recuperada do WordPress, é 24 de janeiro de 2014. O registro estava vinculado ao post 1459 e ao anexo 794.",
    ],
    intervention:
      "A página preserva o caráter de marco de trajetória. Mais do que apresentar uma imagem final, mostra o ponto em que a pesquisa visual de Marcelo começou a transformar fotografia histórica em leitura urbana colorizada.",
    sourceNote:
      "Fonte primária: post 1459, anexo 794, metadados do WordPress e arquivo físico 2013/06/Aérea-1950.jpg, todos cruzados com o backup privado de uploads.",
    image: {
      src: "/memoria/arquivo/vista-aerea-franca-1950.webp",
      alt: "Comparativo de uma vista aérea do centro de Franca na década de 1950, com fotografia original e colorização de Marcelo Fradim.",
      caption: "Vista aérea do centro de Franca, década de 1950: fotografia histórica e primeira experiência de colorização registrada por Marcelo Fradim.",
      provenance:
        "Mestre recuperado do backup privado de wp-content/uploads e vinculado ao post 1459 e ao anexo 794. Derivado WebP publicado após validação de formato e hash SHA-256.",
    },
    mediaNote:
      "Asset reintegrado como marco inicial da trajetória de colorização documentada no antigo Fradim.com.br.",
  },
];

export function getRecoveredMemoryEntry(slug: string) {
  return recoveredMemoryBatch2.find((entry) => entry.slug === slug);
}
