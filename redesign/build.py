#!/usr/bin/env python3
"""Build the isolated visual proposal. Production files are a partial overlay, NOT a whole-site replacement."""
import argparse, hashlib, html, json, pathlib, shutil, urllib.request, xml.etree.ElementTree as ET
from PIL import Image
ROOT=pathlib.Path(__file__).resolve().parent
P=argparse.ArgumentParser();P.add_argument('--output',required=True);P.add_argument('--production',action='store_true');P.add_argument('--offline',action='store_true');args=P.parse_args()
OUT=pathlib.Path(args.output);OUT.mkdir(parents=True,exist_ok=True);ASSETS=OUT/'assets';ASSETS.mkdir(exist_ok=True)
ORIGIN='https://fradim.com.br';CACHE=ROOT/'.asset-cache';CACHE.mkdir(exist_ok=True)
SOURCES={
 'marcelo-fradim.webp':'/hero/marcelo-fradim-hero-2026.webp?v=af90c0da779ad50c',
 'magazine-luiza-1957.webp':'/memoria/arquivo/magazine-luiza-1957.jpg',
 'estacao-mogiana-1925.webp':'/memoria/arquivo/estacao-mogiana-1925.jpg',
 'estacao-mogiana-1930.webp':'/memoria/arquivo/estacao-mogiana-1930.webp',
 'franca-1928.webp':'/memoria/arquivo/franca-1928.webp',
 'rua-comercio-1908.webp':'/memoria/arquivo/rua-comercio-1908.webp',
}
provenance=[]
for name,path in SOURCES.items():
 raw=CACHE/name
 if not args.offline:
  req=urllib.request.Request(ORIGIN+path,headers={'User-Agent':'FradimVisualBuild/1.0'})
  with urllib.request.urlopen(req,timeout=40) as response:
   data=response.read(5_000_001)
   if len(data)>5_000_000:raise ValueError('Image exceeds safety limit: '+path)
   raw.write_bytes(data)
 with Image.open(raw) as im:
  im.load();im.thumbnail((1500,1500));im.save(ASSETS/name,'WEBP',quality=88,method=6)
 provenance.append({'asset':name,'source':ORIGIN+path,'source_sha256':hashlib.sha256(raw.read_bytes()).hexdigest(),'transformation':'WebP conversion/resizing only; composition preserved','output_bytes':(ASSETS/name).stat().st_size})
shot=CACHE/'cartazai.png'
if not shot.exists():raise RuntimeError('Capture the public CartazAI page before building; no invented screenshot fallback.')
with Image.open(shot) as im:im.convert('RGB').save(ASSETS/'cartazai.webp','WEBP',quality=85,method=6)
provenance.append({'asset':'cartazai.webp','source':'https://cartazai.com.br/','type':'Public website screenshot, September 2026','output_bytes':(ASSETS/'cartazai.webp').stat().st_size})
(ASSETS/'provenance.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2))
(ASSETS/'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0b1015"/><text x="13" y="46" fill="#abe3da" font-family="Arial,sans-serif" font-size="48" font-weight="bold">f.</text></svg>')
BIO='Marcelo Fradim é empreendedor e especialista em inteligência artificial e engenharia de prompts, com atuação em marketing, design e desenvolvimento de soluções digitais. É de Franca, São Paulo, e conecta tecnologia, negócios e memória cultural em seus projetos.'
FAQ=[
 ('Quem é Marcelo Fradim?',BIO),
 ('O que Marcelo Fradim faz?','Desenvolve projetos e aplicações de inteligência artificial, automações, produtos digitais e iniciativas de comunicação. Seu trabalho parte de um problema real e combina estratégia, design e execução.'),
 ('Quais projetos fazem parte do seu trabalho?','Entre as iniciativas apresentadas neste site estão Amo Franca, Intelig.Cloud, Gestor 360 e CartazAI. Elas conectam comunicação, memória cultural, inteligência artificial, produtos digitais e operação de varejo. Cada projeto tem contexto e estágio próprios.'),
 ('O que é a parceria Marcelo × Spock?','Spock é o nome que Marcelo Fradim dá à sua colaboração com o ChatGPT. A IA apoia pesquisa, análise, criação e desenvolvimento. Marcelo mantém a direção, a revisão e a responsabilidade pelos projetos e conteúdos.'),
 ('Como entrar em contato com Marcelo Fradim?','Os canais profissionais são o e-mail fradim@gmail.com e o WhatsApp +55 16 98180-4590. O contato pode tratar de projetos, aplicações de IA, comunicação, produtos digitais, cultura, imprensa e parcerias.'),
]
faq_html=''.join('<details><summary>'+html.escape(q)+'<span class="detail-plus" aria-hidden="true">+</span></summary><p>'+html.escape(a)+'</p></details>' for q,a in FAQ)
person={'@type':'Person','@id':ORIGIN+'/#marcelo-fradim','name':'Marcelo Fradim','alternateName':'Fradim','url':ORIGIN+'/marcelo-fradim/','image':ORIGIN+'/assets/marcelo-fradim.webp','description':BIO,'jobTitle':'Especialista em inteligência artificial e engenharia de prompts','homeLocation':{'@type':'Place','name':'Franca, São Paulo, Brasil'},'knowsAbout':['Inteligência artificial','Engenharia de prompts','Automação','Marketing','Design','Produtos digitais','Memória cultural','Restauração fotográfica'],'sameAs':['https://www.linkedin.com/in/marcelofradim/','https://www.instagram.com/marcelofradim/','https://www.behance.net/fradim'],'email':'fradim@gmail.com','telephone':'+55-16-98180-4590'}
website={'@type':'WebSite','@id':ORIGIN+'/#website','url':ORIGIN+'/','name':'Marcelo Fradim','inLanguage':'pt-BR','publisher':{'@id':person['@id']}}
faq_schema={'@type':'FAQPage','@id':ORIGIN+'/#perguntas','mainEntity':[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in FAQ]}
webpage={'@type':'WebPage','@id':ORIGIN+'/#webpage','url':ORIGIN+'/','name':'Marcelo Fradim | Inteligência artificial, marketing e criação','about':{'@id':person['@id']},'isPartOf':{'@id':website['@id']},'inLanguage':'pt-BR'}
schema={'@context':'https://schema.org','@graph':[person,website,webpage,faq_schema]}
robots='index,follow,max-image-preview:large' if args.production else 'noindex,follow'
text=(ROOT/'index.html').read_text().replace('__ROBOTS__',robots).replace('__SCHEMA__',json.dumps(schema,ensure_ascii=False).replace('<','\\u003c')).replace('__FAQ_HTML__',faq_html)
(OUT/'index.html').write_text(text)
for f in ['site.css','site.js']:shutil.copyfile(ROOT/f,OUT/f)
profile_schema={'@context':'https://schema.org','@graph':[person,website,{'@type':'ProfilePage','@id':ORIGIN+'/marcelo-fradim/#webpage','url':ORIGIN+'/marcelo-fradim/','name':'Quem é Marcelo Fradim? Perfil profissional','mainEntity':{'@id':person['@id']},'isPartOf':{'@id':website['@id']},'inLanguage':'pt-BR'}, {'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Início','item':ORIGIN+'/'},{'@type':'ListItem','position':2,'name':'Marcelo Fradim','item':ORIGIN+'/marcelo-fradim/'}]}]}
profile='''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Quem é Marcelo Fradim? Perfil profissional e projetos</title><meta name="description" content="Perfil profissional de Marcelo Fradim: inteligência artificial, engenharia de prompts, marketing, produtos digitais e memória cultural em Franca, SP."><meta name="robots" content="ROBOTS"><link rel="canonical" href="https://fradim.com.br/marcelo-fradim/"><link rel="stylesheet" href="../site.css"><link rel="icon" href="../assets/favicon.svg" type="image/svg+xml"><meta property="og:type" content="profile"><meta property="og:title" content="Quem é Marcelo Fradim?"><meta property="og:description" content="Inteligência artificial, marketing, produtos digitais e memória cultural."><meta property="og:url" content="https://fradim.com.br/marcelo-fradim/"><meta property="og:image" content="https://fradim.com.br/assets/fradim-social.jpg"><meta property="og:locale" content="pt_BR"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">SCHEMA</script></head><body><a class="skip" href="#perfil">Pular para o conteúdo</a><header class="site-header wrap"><a class="wordmark" href="../">fradim<span class="brand-dot">.</span></a><a class="header-contact" href="../">← Voltar ao início</a><a class="header-contact" href="https://fradim.com.br/contato/">Contato ↗</a></header><main id="perfil" class="profile-layout wrap"><div class="profile-intro"><div><p class="eyebrow">PERFIL PROFISSIONAL / FRANCA, SÃO PAULO</p><h1>Marcelo<br>Fradim.</h1><p>BIO</p></div><img src="../assets/marcelo-fradim.webp" alt="Retrato de Marcelo Fradim" width="741" height="768" fetchpriority="high"></div><dl class="profile-facts"><div><dt>ÁREAS DE ATUAÇÃO</dt><dd>Inteligência artificial, engenharia de prompts, marketing, design e produtos digitais.</dd></div><div><dt>BASE</dt><dd>Franca, São Paulo, Brasil.</dd></div><div><dt>PROJETOS APRESENTADOS</dt><dd>Amo Franca, Intelig.Cloud, Gestor 360 e CartazAI.</dd></div><div><dt>CONTATO PROFISSIONAL</dt><dd><a href="mailto:fradim@gmail.com">fradim@gmail.com</a><br><a href="https://wa.me/5516981804590">+55 16 98180-4590</a></dd></div></dl><section><h2>Da criação à inteligência aplicada</h2><p>A trajetória de Marcelo Fradim conecta imagem, fotografia, design, comunicação e negócios. A experiência na Democrata Calçados contribuiu para seu repertório de marca e mercado. A atuação com Ribeirânia e Tiãozinho acrescentou vivência em distribuição, varejo, campanhas, trade e processos.</p><p>O Amo Franca reúne comunicação, cultura, pesquisa visual e memória local. Fotografias e registros históricos são apresentados com contexto e identificação das intervenções de restauração e colorização. O objetivo é aproximar as pessoas da história sem confundir o documento original com sua interpretação visual.</p><p>A inteligência artificial é uma camada dessa trajetória, não um substituto para o repertório anterior. O trabalho combina entendimento do problema, prototipagem, revisão e desenvolvimento. Ferramentas são escolhidas de acordo com a necessidade do projeto.</p><p><a href="https://fradim.com.br/sobre/">Leia a trajetória completa</a> ou <a href="https://fradim.com.br/memoria/">explore o arquivo de memória</a>.</p></section><section><h2>Projetos e contextos</h2><p><strong>Amo Franca:</strong> iniciativa que conecta comunicação, comunidade e memória cultural de Franca. <a href="https://fradim.com.br/projetos/amo-franca/">Conheça o projeto.</a></p><p><strong>Intelig.Cloud:</strong> iniciativa voltada a agentes, automações, sistemas e produtos digitais. <a href="https://fradim.com.br/projetos/intelig-cloud/">Conheça a proposta.</a></p><p><strong>Gestor 360:</strong> visão de integração entre marketing, trade, campanhas, tarefas, indicadores e processos. <a href="https://fradim.com.br/projetos/gestor-360/">Veja o contexto do sistema.</a></p><p><strong>CartazAI:</strong> projeto de comunicação visual de ofertas para o varejo. <a href="https://cartazai.com.br/">Visite a página pública.</a></p><p>As iniciativas possuem contextos e estágios próprios. Esta apresentação não atribui resultados financeiros, certificações, premiações ou indicadores que não estejam documentados.</p></section><section><h2>Uma colaboração chamada Spock</h2><p>Spock é o nome que Marcelo dá à sua colaboração com o ChatGPT. A IA participa de atividades como pesquisa, organização, criação, programação e análise. A direção do trabalho e a responsabilidade editorial permanecem humanas.</p><p><a href="https://fradim.com.br/spock/">Entenda o método Marcelo × Spock.</a></p></section><section><h2>Perguntas sobre Marcelo Fradim</h2><div class="faq-list">FAQ</div></section><section><h2>Perfis e canais públicos</h2><p><a href="https://www.linkedin.com/in/marcelofradim/">LinkedIn</a> · <a href="https://www.instagram.com/marcelofradim/">Instagram</a> · <a href="https://www.behance.net/fradim">Behance</a></p><p>Para projetos, imprensa e parcerias, entre em contato por <a href="mailto:fradim@gmail.com">e-mail</a> ou <a href="https://wa.me/5516981804590">WhatsApp</a>.</p></section></main><footer class="wrap footer-bottom"><span>© 2026 Marcelo Fradim</span><a href="../">Voltar ao site</a></footer></body></html>'''
profile=profile.replace('ROBOTS',robots).replace('SCHEMA',json.dumps(profile_schema,ensure_ascii=False).replace('<','\\u003c')).replace('BIO',html.escape(BIO)).replace('FAQ',faq_html)
(OUT/'marcelo-fradim').mkdir(exist_ok=True);(OUT/'marcelo-fradim/index.html').write_text(profile)
llms='# Marcelo Fradim\n\n> '+BIO+'\n\n## Páginas principais\n\n- [Início](https://fradim.com.br/): apresentação, áreas de atuação, projetos e acervo visual.\n- [Perfil profissional](https://fradim.com.br/marcelo-fradim/): identidade, trajetória resumida, projetos e canais profissionais.\n- [Trajetória](https://fradim.com.br/sobre/): repertório e experiência profissional.\n- [Projetos](https://fradim.com.br/projetos/): contextos e iniciativas.\n- [Inteligência artificial](https://fradim.com.br/inteligencia-artificial/): visão e aplicações.\n- [Memória](https://fradim.com.br/memoria/): fotografias e registros históricos, com intervenções identificadas.\n- [Marcelo × Spock](https://fradim.com.br/spock/): colaboração humano + IA.\n- [Contato](https://fradim.com.br/contato/): canais públicos.\n\n## Projetos\n\n- [Amo Franca](https://fradim.com.br/projetos/amo-franca/)\n- [Intelig.Cloud](https://fradim.com.br/projetos/intelig-cloud/)\n- [Gestor 360](https://fradim.com.br/projetos/gestor-360/)\n- [CartazAI](https://cartazai.com.br/)\n\nEste arquivo é um índice complementar de conteúdo público. A informação biográfica também está disponível em HTML nas páginas indicadas.\n'
(OUT/'llms.txt').write_text(llms)
if args.production:
 # Preserve the complete current sitemap; never replace it with only the redesigned pages.
 cachemap=CACHE/'sitemap.xml'
 if not args.offline:
  with urllib.request.urlopen(ORIGIN+'/sitemap.xml',timeout=30) as r:cachemap.write_bytes(r.read())
 ns='http://www.sitemaps.org/schemas/sitemap/0.9';ET.register_namespace('',ns);tree=ET.parse(cachemap);root=tree.getroot()
 if root.tag!='{'+ns+'}urlset':raise RuntimeError('Unexpected sitemap type; requires manual merge.')
 url=ORIGIN+'/marcelo-fradim/'
 if not any((x.text or '').rstrip('/')==url.rstrip('/') for x in root.findall('.//{'+ns+'}loc')):
  item=ET.SubElement(root,'{'+ns+'}url');ET.SubElement(item,'{'+ns+'}loc').text=url
 tree.write(OUT/'sitemap.xml',encoding='utf-8',xml_declaration=True)
 (OUT/'robots.txt').write_text('User-agent: *\nAllow: /\n\n# Search crawling is independent of model-training policies.\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: https://fradim.com.br/sitemap.xml\n')
else:(OUT/'robots.txt').write_text('User-agent: *\nAllow: /\n# Preview HTML carries noindex. Do not submit this host as the canonical site.\n')
(OUT/'.nojekyll').touch()
(OUT/'build-info.json').write_text(json.dumps({'version':'fradim-visual-geo-2026-09','mode':'partial-production-overlay' if args.production else 'isolated-preview','production_domain_changed':False,'external_site_routes_preserved':True},indent=2))
print('Built',OUT,'with',sum(1 for x in OUT.rglob('*') if x.is_file()),'files.')
