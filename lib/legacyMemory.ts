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
];

export function getLegacyMemoryEntry(slug: string) {
  return legacyMemoryEntries.find((entry) => entry.slug === slug);
}
