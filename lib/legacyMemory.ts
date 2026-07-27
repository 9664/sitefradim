export type LegacyMemoryImage = {
  src: string;
  alt: string;
  caption: string;
  provenance: string;
};

export type LegacyMemorySource = {
  label: string;
  href: string;
};

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
  researchSource?: LegacyMemorySource;
  image?: LegacyMemoryImage;
  mediaNote: string;
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
      "Colorização digital realizada por Marcelo Fradim sobre uma fotografia histórica. O arquivo visual foi recuperado do acervo legado, conferido por hash e migrado somente depois da revisão técnica e visual.",
    sourceLabel: "Magazine Luiza — histórico institucional",
    sourceHref:
      "https://ri.magazineluiza.com.br/Download/Formulario-de-Referencia-_Magazine-Luiza_2025?=gQNv6Vxr6lTdEY6ilO%2FqdA%3D%3D",
    image: {
      src: "/memoria/arquivo/magazine-luiza-1957.jpg",
      alt: "Fachada da primeira loja do Magazine Luiza em Franca, em fotografia histórica colorizada por Marcelo Fradim.",
      caption: "Primeira loja do Magazine Luiza em Franca. Intervenção de colorização: Marcelo Fradim.",
      provenance:
        "Arquivo recuperado do Fradim.com.br legado, validado por SHA-256 e republicado após remoção lossless de metadados. A autoria da intervenção está inscrita na própria imagem; a identificação da fotografia histórica original permanece separada dessa autoria.",
    },
    mediaNote:
      "Asset aprovado e reintegrado ao novo acervo. A cadeia técnica da migração registra o hash do arquivo legado e o hash da cópia sanitizada publicada.",
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
      "Restauração e colorização digital realizadas a partir do registro histórico. O comparativo recuperado do site legado mantém visíveis a fotografia em preto e branco e a interpretação restaurada/colorizada, tornando a intervenção explícita.",
    sourceLabel: "Prefeitura de Franca — histórico da antiga Mogiana",
    sourceHref: "https://www3.franca.sp.gov.br/noticia/26039/antiga-mogiana.html",
    image: {
      src: "/memoria/arquivo/estacao-mogiana-1925.jpg",
      alt: "Comparativo da Estação Mogiana de Franca em 1925 com fotografia original e versão restaurada e colorizada por Marcelo Fradim.",
      caption: "Estação Mogiana de Franca, 1925: fotografia histórica e versão restaurada/colorizada por Marcelo Fradim.",
      provenance:
        "Arquivo recuperado do Fradim.com.br legado, validado por SHA-256 e republicado após remoção lossless de metadados. A procedência institucional da fotografia histórica original continua sendo tratada como pesquisa separada da intervenção de restauração.",
    },
    mediaNote:
      "Asset aprovado e reintegrado ao novo acervo. A composição preserva o comparativo que já existia no site antigo e a assinatura da intervenção.",
  },
  {
    slug: "av-central-rio-de-janeiro-em-1910",
    title: "Avenida Central / Rio Branco — c. 1910–1915",
    year: "c. 1910–1915",
    location: "Centro, Rio de Janeiro, RJ",
    summary:
      "Página preservada do antigo acervo de colorizações do Fradim.com.br, dedicada à antiga Avenida Central — atual Avenida Rio Branco — no início do século XX. A data exata do registro permanece em revisão.",
    context: [
      "A Avenida Central foi uma das principais obras da reforma urbana do Rio de Janeiro no início do século XX e, em 1912, passou a se chamar Avenida Rio Branco. Acervos institucionais preservam diversos registros da via produzidos entre a década de 1900 e meados da década de 1910.",
      "O WordPress antigo titulava este registro como 1910. Durante a nova curadoria, a mesma cena foi localizada em uma publicação identificada como trânsito na Avenida Rio Branco em 1915. Como a fotografia histórica de origem ainda não foi identificada de forma inequívoca, esta página abandona a data rígida e trabalha provisoriamente com c. 1910–1915, preservando o slug antigo apenas por continuidade de URL.",
    ],
    intervention:
      "A versão colorizada do acervo legado foi localizada, validada tecnicamente e revisada visualmente. A assinatura de Marcelo Fradim está presente no arquivo, mas a fotografia histórica de origem ainda precisa de uma atribuição documental mais sólida antes da republicação.",
    sourceLabel: "Brasiliana Fotográfica — Avenida Central, atual Rio Branco",
    sourceHref: "https://brasilianafotografica.bn.gov.br/?tag=avenida-central",
    researchSource: {
      label: "Motor1 — cena publicada como Avenida Rio Branco em 1915",
      href: "https://motor1.uol.com.br/features/736303/historia-ranking-vendas-brasil-1912/",
    },
    mediaNote:
      "Arquivo colorizado localizado e tecnicamente íntegro, mas mantido fora do novo site enquanto autoria, proveniência e data exata da fotografia original permanecem em pesquisa.",
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
      "A versão colorizada existente no acervo antigo foi localizada durante a migração, mas a fotografia de base mantém marca visível de Corbis/Getty Images. Por isso, o arquivo foi rejeitado para republicação no novo Fradim.com.br.",
    sourceLabel: "Brasiliana Fotográfica — registros históricos de Copacabana",
    sourceHref: "https://brasilianafotografica.bn.gov.br/?tag=copacabana",
    mediaNote:
      "Asset legado revisado e rejeitado para migração por conter marca de terceiro. A URL histórica permanece preservada por seu contexto editorial, sem republicar a imagem.",
  },
];

export function getLegacyMemoryEntry(slug: string) {
  return legacyMemoryEntries.find((entry) => entry.slug === slug);
}
