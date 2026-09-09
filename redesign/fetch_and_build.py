#!/usr/bin/env python3
"""Build entry point with consistent identification for public-site requests."""
import pathlib
import runpy
import urllib.request
opener = urllib.request.build_opener()
opener.addheaders = [('User-Agent', 'FradimVisualBuild/1.0')]
urllib.request.install_opener(opener)
runpy.run_path(str(pathlib.Path(__file__).with_name('build.py')), run_name='__main__')
