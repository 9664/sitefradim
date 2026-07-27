export type LegacyMemoryEntry = {
  slug: string;
  title: string;
  year: string;
  location: string;
  summary: string;
  context: string[];
  intervention: string;
  sourceLabel: string;
  sourceHref: string;
};

export const legacyMemoryEntries: LegacyMemoryEntry[] = [
  {
    slug: "primeira-loja-do-magazine-luiza-em-1957",
    title: "Primeira loja do Magazine Luiza em 1957",
    year: "1957",
    location: "Franca, SP",
    summary:
      "Registro ligado ao início do Magazine Luiza em Franca e preservado como parte do antigo acervo de fotografias colorizadas do Fradim.com.br.",
    context: [
      "A história institucional do Magazine Luiza começa em 1957, em Franca, quando Luiza Trajano Donato e Pelegrino José Donato adquiriram uma pequena loja conhecida como A Cristaleira.",
      "O material visual publicado no antigo Fradim.com.br recebeu intervenção de colorização. Nesta nova versão, a página passa a separar claramente o contexto histórico da intervenção visual.",
    ],
    intervention:
      "Colorização digital realizada por Marcelo Fradim sobre uma fotografia histórica. O arquivo visual será reincorporado somente depois da curadoria dos assets do WordPress legado, evitando dependência técnica do ambiente antigo.",
    sourceLabel: "Magazine Luiza — histórico institucional",
    sourceHref:
      "https://ri.magazineluiza.com.br/Download/Formulario-de-Referencia-_Magazine-Luiza_2025?=gQNv6Vxr6lTdEY6ilO%2FqdA%3D%3D",
  },
  {
    slug: "locomotiva-em-1925",
    title: "Locomotiva em 1925",
    year: "1925",
    location: "Estação de Franca, SP",
    summary:
      "Registro ferroviário do antigo acervo visual do Fradim.com.br, associado à Estação da Companhia Mogiana em Franca.",
    context: [
      "A Estação de Franca foi inaugurada em 1887 e se tornou um dos elementos decisivos para a expansão urbana do entorno da ferrovia.",
      "A página antiga do Fradim.com.br identificava a fotografia como um registro da estação e de uma locomotiva em 1925. A nova versão preserva essa memória sem tratar a colorização como documento original.",
    ],
    intervention:
      "Restauração e colorização digital realizadas a partir do registro histórico. A imagem será migrada em uma etapa própria de curadoria de mídia, acompanhada da distinção entre fotografia original e intervenção.",
    sourceLabel: "Prefeitura de Franca — histórico da antiga Mogiana",
    sourceHref: "https://www3.franca.sp.gov.br/noticia/26039/antiga-mogiana.html",
  },
  {
    slug: "av-central-rio-de-janeiro-em-1910",
    title: "Av. Central, Rio de Janeiro, em 1910",
    year: "c. 1910",
    location: "Centro, Rio de Janeiro, RJ",
    summary:
      "Página preservada do antigo acervo de colorizações do Fradim.com.br, dedicada à Avenida Central — atual Avenida Rio Branco — no início do século XX.",
    context: [
      "A Avenida Central foi uma das principais obras da reforma urbana do Rio de Janeiro no início do século XX e corresponde à atual Avenida Rio Branco. A Brasiliana Fotográfica reúne diversos registros da avenida produzidos naquele período, inclusive imagens datadas de cerca de 1910.",
      "A página antiga do Fradim.com.br identificava a imagem publicada como Avenida Central, Rio de Janeiro, em 1910. A fonte externa indicada abaixo sustenta o contexto histórico da avenida e da época; ela não é apresentada como prova da proveniência exata da fotografia colorizada no site antigo.",
    ],
    intervention:
      "Colorização digital publicada no acervo antigo de Marcelo Fradim. A autoria e a instituição custodiante da fotografia original permanecem em curadoria e só serão atribuídas quando o arquivo visual correspondente puder ser comparado com uma fonte primária confiável.",
    sourceLabel: "Brasiliana Fotográfica — Avenida Central, atual Rio Branco",
    sourceHref: "https://brasilianafotografica.bn.gov.br/?p=5880",
  },
  {
    slug: "copacabana-rio-de-janeiro-anos-40",
    title: "Copacabana — Rio de Janeiro, anos 40",
    year: "década de 1940",
    location: "Copacabana, Rio de Janeiro, RJ",
    summary:
      "Página preservada do antigo acervo de colorizações do Fradim.com.br, associada à paisagem de Copacabana na década de 1940.",
    context: [
      "Durante a década de 1940, Copacabana consolidava-se como um dos grandes símbolos da transformação urbana e cultural do Rio de Janeiro. A Brasiliana Fotográfica reúne documentação e imagens que permitem acompanhar as mudanças do bairro ao longo desse período.",
      "A página antiga do Fradim.com.br identificava o registro visual como Copacabana, Rio de Janeiro, nos anos 40. A referência externa desta nova página é usada para contextualizar o bairro e o período, não para afirmar que o item do acervo institucional é necessariamente a fotografia original colorizada por Marcelo.",
    ],
    intervention:
      "Colorização digital publicada no antigo Fradim.com.br. A reintegração do asset dependerá da identificação do arquivo original e de sua proveniência, mantendo separadas a fotografia documental e a intervenção posterior.",
    sourceLabel: "Brasiliana Fotográfica — registros históricos de Copacabana",
    sourceHref: "https://brasilianafotografica.bn.gov.br/?tag=copacabana",
  },
];

export function getLegacyMemoryEntry(slug: string) {
  return legacyMemoryEntries.find((entry) => entry.slug === slug);
}
