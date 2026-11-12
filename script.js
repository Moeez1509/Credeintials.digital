const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
const links=[...document.querySelectorAll('.nav-link')];

window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>30);
  const sections=[...document.querySelectorAll('main section[id]')];
  const current=sections.reduce((active,section)=>window.scrollY>=section.offsetTop-150?section.id:active,'home');
  links.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+current));
},{passive:true});

toggle.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded',open);
});
links.forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
document.querySelector('.mobile-nav-cta').addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')});

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelector('.filter.active').classList.remove('active');button.classList.add('active');
  const category=button.dataset.filter;
  document.querySelectorAll('.menu-item').forEach(item=>item.classList.toggle('hidden',category!=='all'&&item.dataset.category!==category));
}));

const lightbox=document.querySelector('.lightbox');
const lightboxImg=lightbox.querySelector('img');
function closeLightbox(){lightbox.classList.remove('open');document.body.classList.remove('no-scroll')}
document.querySelectorAll('.gallery-item').forEach(item=>item.addEventListener('click',()=>{
  lightboxImg.src=item.dataset.full;lightboxImg.alt=item.querySelector('img').alt;lightbox.classList.add('open');document.body.classList.add('no-scroll');
}));
document.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox()});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeLightbox()});

const form=document.querySelector('.reserve-form');
form.addEventListener('submit',event=>{
  event.preventDefault();
  const status=form.querySelector('.form-status');
  if(!form.checkValidity()){status.textContent='Please complete the required fields above.';form.reportValidity();return}
  status.textContent='Thank you — your demo request is ready to be connected to a booking system.';form.reset();
});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach((element,index)=>{element.style.transitionDelay=`${(index%4)*70}ms`;observer.observe(element)});
