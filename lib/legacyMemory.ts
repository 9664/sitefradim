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
  sourceLabel?: string;
  sourceHref?: string;
  sourceNote?: string;
  researchSource?: LegacyMemorySource;
  image?: LegacyMemoryImage;
  mediaNote: string;
};

export const legacyMemoryEntries: LegacyMemoryEntry[] = [
  {
    slug: "largo-do-rosario-em-1900",
    title: "Largo do Rosário em 1900",
    year: "1900",
    location: "Largo da Conceição, Franca, SP",
    summary:
      "Uma das imagens mais antigas do centro de Franca retorna ao acervo mostrando o largo antes da praça e a nova Igreja Matriz ainda em construção.",
    context: [
      "O texto preservado no WordPress antigo descrevia esta fotografia como um dos raros registros do centro de Franca no início do século XX. A cena mostra o atual entorno da Praça Nossa Senhora da Conceição quando o espaço ainda era tratado como largo.",
      "Ao fundo aparece a estrutura da nova Igreja Matriz em construção. A data editorial original do post, recuperada pelo metadado _wp_old_date, é 11 de julho de 2014; a imagem histórica é identificada no próprio material como sendo de 1900.",
    ],
    intervention:
      "O arquivo recuperado já apresenta a fotografia histórica e a interpretação restaurada/colorizada em uma composição comparativa assinada por Marcelo Fradim. A nova publicação preserva essa distinção para que documento e intervenção possam ser vistos lado a lado.",
    sourceNote:
      "Fonte primária: texto, metadados e anexo recuperados do Fradim.com.br legado. O arquivo físico foi cruzado com o caminho 2013/06/Largo-da-Conceição-1900.jpg no snapshot privado de uploads. A atribuição da fotografia histórica original permanece como pesquisa separada da autoria da restauração.",
    image: {
      src: "/memoria/arquivo/largo-conceicao-1900.webp",
      alt: "Comparativo do Largo da Conceição em Franca em 1900, com fotografia histórica e versão restaurada e colorizada por Marcelo Fradim.",
      caption: "Largo da Conceição, 1900: fotografia histórica e interpretação restaurada/colorizada por Marcelo Fradim.",
      provenance:
        "Mestre localizado no backup privado de wp-content/uploads, relacionado ao anexo 798 do WordPress e ao post 1451. Publicado no 2.0 após validação de formato, hash SHA-256 e recodificação WebP sem metadados herdados.",
    },
    mediaNote:
      "Asset aprovado e reintegrado ao novo acervo. A composição comparativa preserva a leitura do documento e deixa a intervenção visual explícita.",
  },
  {
    slug: "inauguracao-da-praca-em-1909",
    title: "Inauguração da Praça em 1909",
    year: "1909",
    location: "Praça Nossa Senhora da Conceição, Franca, SP",
    summary:
      "A praça central de Franca aparece ornamentada e ocupada pela população em um registro restaurado e colorizado que devolve escala humana ao início do século XX.",
    context: [
      "Segundo o texto original recuperado do antigo Fradim.com.br, a imagem registra a inauguração da Praça Nossa Senhora da Conceição em 1909 e relaciona a organização do evento à Associação dos Empregados no Comércio.",
      "A publicação original foi registrada em 9 de setembro de 2014. A fotografia permite observar jardins, coretos, bandeiras, edificações do entorno e a presença da população em uma das áreas mais reconhecíveis da cidade.",
    ],
    intervention:
      "Restauração e colorização realizadas por Marcelo Fradim. A intervenção busca recuperar leitura de arquitetura, vegetação, vestuário e ocupação urbana, sem apresentar as cores reconstruídas como evidência cromática original.",
    sourceNote:
      "Fonte primária: post 1447 e anexo 791 do WordPress legado, cruzados com o mestre físico preservado no backup privado de uploads. O texto histórico foi sanitizado e a data original foi restaurada pelo metadado _wp_old_date.",
    image: {
      src: "/memoria/arquivo/inauguracao-praca-1909.webp",
      alt: "Vista da inauguração da Praça Nossa Senhora da Conceição em Franca em 1909, restaurada e colorizada por Marcelo Fradim.",
      caption: "Inauguração da Praça Nossa Senhora da Conceição, 1909. Restauração e colorização: Marcelo Fradim.",
      provenance:
        "Mestre localizado no backup privado de wp-content/uploads e vinculado ao conjunto editorial do post 1447. Publicado no 2.0 após validação técnica, fixação de hash e recodificação WebP sem metadados herdados.",
    },
    mediaNote:
      "Asset aprovado e reintegrado. O registro passa a integrar a linha temporal de Franca com data editorial, texto original recuperado e intervenção visual identificada.",
  },
  {
    slug: "estacao-mogiana-em-1909",
    title: "Estação Mogiana — c. 1908–1909",
    year: "c. 1908–1909",
    location: "Estação Mogiana, Franca, SP",
    summary:
      "Uma rara vista da Estação Mogiana cercada por charretes retorna ao arquivo com a divergência de data preservada, em vez de apagada.",
    context: [
      "O post antigo identificava a cena como Estação Mogiana de Franca em 1909 e destacava as charretes usadas no transporte de passageiros, em função semelhante à dos táxis.",
      "O nome do anexo preservado no WordPress, porém, é 1908-estação-final-p.jpg. Como as duas evidências divergem, o 2.0 adota provisoriamente o intervalo c. 1908–1909 até que uma fonte documental independente permita fixar a data com maior segurança.",
    ],
    intervention:
      "A versão recuperada apresenta colorização digital da estação, veículos, animais e paisagem do entorno. A publicação mantém a intervenção identificada e registra explicitamente a incerteza cronológica encontrada na migração.",
    sourceNote:
      "Fonte primária: post 1453, anexo 781 e arquivo físico 2013/06/1908-estação-final-p.jpg. A data editorial original do post foi recuperada como 28 de agosto de 2014; a data da fotografia permanece em revisão.",
    image: {
      src: "/memoria/arquivo/estacao-mogiana-1909.webp",
      alt: "Estação Mogiana de Franca por volta de 1908 a 1909, com charretes e passageiros, em versão colorizada por Marcelo Fradim.",
      caption: "Estação Mogiana de Franca, c. 1908–1909. Colorização digital: Marcelo Fradim.",
      provenance:
        "Mestre recuperado do backup privado de uploads e vinculado ao anexo 781. Publicado no 2.0 após validação de formato, hash SHA-256 e recodificação WebP sem metadados herdados; divergência de data registrada na própria página.",
    },
    mediaNote:
      "Asset aprovado e reintegrado. A divergência entre o título do post e o nome do anexo permanece documentada como parte da cadeia de evidências.",
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
      "A versão colorizada existente no acervo antigo foi localizada durante a migração, mas a fotografia de base mantém marca visível de terceiro. Por isso, o arquivo foi rejeitado para republicação no novo Fradim.com.br.",
    sourceLabel: "Brasiliana Fotográfica — registros históricos de Copacabana",
    sourceHref: "https://brasilianafotografica.bn.gov.br/?tag=copacabana",
    mediaNote:
      "Asset legado revisado e rejeitado para migração por conter marca de terceiro. A URL histórica permanece preservada por seu contexto editorial, sem republicar a imagem.",
  },
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
    slug: "crianca-decada-de-60",
    title: "Criança — década de 1960",
    year: "década de 1960",
    location: "local não documentado",
    summary:
      "Registro preservado do antigo acervo de colorizações do Fradim.com.br. A URL permanece, mas a fotografia não é republicada enquanto a origem do retrato e suas condições de uso não estiverem documentadas.",
    context: [
      "A página antiga reunia duas variantes do mesmo retrato: uma fotografia em preto e branco e uma versão colorizada. As duas foram recuperadas em quarentena e validadas como JPEGs íntegros, com as mesmas dimensões.",
      "A versão colorizada traz a assinatura de Marcelo Fradim como responsável pela restauração/colorização. A página antiga, porém, não documenta fotógrafo, local, data exata ou origem do retrato. Por se tratar de uma fotografia de uma criança, a nova curadoria opta por preservar o registro sem republicar a imagem até que a proveniência esteja melhor estabelecida.",
    ],
    intervention:
      "Os metadados embutidos nas duas variantes registram edição em Adobe Photoshop em abril de 2020. Isso ajuda a documentar a intervenção digital, mas não resolve a autoria nem a proveniência da fotografia histórica original.",
    sourceNote:
      "Até o momento, a única evidência direta disponível é o próprio conjunto recuperado do WordPress legado. Sem uma fonte externa ou documentação de origem suficiente, o asset permanece fora da publicação.",
    mediaNote:
      "As duas variantes foram tecnicamente validadas e revisadas, mas permanecem em hold de proveniência. Nenhum dos JPEGs foi promovido para public/.",
  },
];

export function getLegacyMemoryEntry(slug: string) {
  return legacyMemoryEntries.find((entry) => entry.slug === slug);
}
