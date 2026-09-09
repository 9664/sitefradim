#!/usr/bin/env python3
"""Canonical build entry point: public requests and final visual containment."""
import pathlib
import runpy
import urllib.request
opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'FradimVisualBuild/1.0')]
urllib.request.install_opener(opener)
result = runpy.run_path(str(pathlib.Path(__file__).with_name('build.py')), run_name='__main__')
output = result['OUT']
# Clip decorative orbital lines locally without hiding overflowing page content globally.
with (output / 'site.css').open('a') as css:
    css.write('\n/* Decorative hero orbits stay within their own section. */\n.hero{overflow:clip;overflow-clip-margin:18px}\n')
