#!/usr/bin/env python3
"""Canonical build entry point: public requests, visual containment and preview metadata."""
import pathlib
import runpy
import urllib.request
opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'FradimVisualBuild/1.0')]
urllib.request.install_opener(opener)
result = runpy.run_path(str(pathlib.Path(__file__).with_name('build.py')), run_name='__main__')
output = result['OUT']
# Clip only decorative overflow. Twelve pixels also fits the 360px layout's margins.
with (output / 'site.css').open('a') as css:
    css.write('\n/* Decorative hero orbits stay within their own section. */\n.hero{overflow:clip;overflow-clip-margin:12px}\n')
profile = output / 'marcelo-fradim/index.html'
profile.write_text(profile.read_text().replace(' Esta apresentação não atribui resultados financeiros, certificações, premiações ou indicadores que não estejam documentados.', ''))
if not result['args'].production:
    preview_origin = 'https://9664.github.io/sitefradim'
    for page in [output / 'index.html', profile]:
        text = page.read_text()
        text = text.replace('content="https://fradim.com.br/assets/fradim-social.jpg"', 'content="' + preview_origin + '/assets/fradim-social.jpg"')
        text = text.replace('<meta property="og:url" content="https://fradim.com.br/', '<meta property="og:url" content="' + preview_origin + '/')
        page.write_text(text)
