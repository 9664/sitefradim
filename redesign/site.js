'use strict';
// Native navigation and content work without JavaScript. Only the gallery is enhanced.
const dialog = document.getElementById('lightbox');
if (dialog && typeof dialog.showModal === 'function') {
  let opener = null;
  const image = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const source = document.getElementById('lightbox-source');
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img')?.alt || link.dataset.caption || '';
      caption.textContent = link.dataset.caption || '';
      source.href = link.dataset.source || 'https://fradim.com.br/memoria/';
      dialog.showModal();
    });
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const r = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus({preventScroll:true}));
}
const mobile = document.querySelector('.mobile-nav');
mobile?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { mobile.open = false; }));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && mobile?.open) { mobile.open = false; mobile.querySelector('summary').focus(); } });
