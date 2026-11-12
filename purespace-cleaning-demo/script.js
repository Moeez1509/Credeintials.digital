const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
const links=[...document.querySelectorAll('.nav-link')];
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>30);
  const sections=[...document.querySelectorAll('main section[id]')];
  const current=sections.reduce((active,section)=>window.scrollY>=section.offsetTop-150?section.id:active,'home');
  links.forEach(link=>{const active=link.getAttribute('href')==='#'+current;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')});
},{passive:true});
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('no-scroll')}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);document.body.classList.toggle('no-scroll',open)});
links.forEach(link=>link.addEventListener('click',closeMenu));
document.querySelector('.mobile-nav-cta').addEventListener('click',closeMenu);
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
document.querySelectorAll('.reveal').forEach((element,index)=>{element.style.transitionDelay=`${(index%4)*70}ms`;new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible')}}),{threshold:.12}).observe(element)});
const form=document.querySelector('.quote-form');
form.addEventListener('submit',event=>{event.preventDefault();const status=form.querySelector('.form-status');if(!form.checkValidity()){status.textContent='Please complete the required fields above.';form.reportValidity();return}status.textContent='Thanks — this demo request is ready to connect to a real quote workflow.';form.reset()});
