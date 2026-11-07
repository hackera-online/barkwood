(function(){
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var WA='359894309838',EMAIL='hello@barkwood-doghotel.com',ST={"en": {"invalid": "Please complete the highlighted fields.", "title": "New booking request", "service": "Service", "dates": "Dates", "days": "Days/week", "dog": "Dog", "size": "Size", "sex": "Sex", "neut": "Neutered", "vacc": "Vaccinated", "par": "Fleas/worms treated", "notes": "Notes", "owner": "Owner", "phone": "Phone", "email": "Email", "addr": "Address", "vet": "Vet", "yes": "yes", "no": "no", "to": " to ", "subj": "Booking request"}, "bg": {"invalid": "Моля, попълнете маркираните полета.", "title": "Нова заявка за резервация", "service": "Услуга", "dates": "Дати", "days": "Дни/седмица", "dog": "Куче", "size": "Размер", "sex": "Пол", "neut": "Кастрирано", "vacc": "Ваксинирано", "par": "Обезпаразитено", "notes": "Бележки", "owner": "Стопанин", "phone": "Телефон", "email": "Имейл", "addr": "Адрес", "vet": "Ветеринар", "yes": "да", "no": "не", "to": " до ", "subj": "Заявка за резервация"}};
var LG=document.body.getAttribute('data-lang')||'en';
/* the merged preview marks the active language on the visible page */
var S=function(){var p=document.querySelector('.page.on');var l=p?p.getAttribute('data-lang'):LG;return ST[l||'en']};
document.addEventListener('click',function(e){
 var b=e.target.closest('.burger');
 if(b){var n=b.parentNode.querySelector('.nav'),o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':'';return}
 var d=e.target.closest('.dd-btn');
 if(d){e.preventDefault();var dd=d.parentNode,o2=dd.classList.toggle('open');d.setAttribute('aria-expanded',o2);return}
 var a=e.target.closest('[data-copy]');
 if(a){try{navigator.clipboard&&navigator.clipboard.writeText(a.getAttribute('data-copy')).catch(function(){})}catch(x){}
  a.classList.add('copied');setTimeout(function(){a.classList.remove('copied')},3500)}
});
$$('.cform').forEach(function(cf){cf.addEventListener('submit',function(e){e.preventDefault();
 var ok=true;['name','contact','message'].forEach(function(n){var el=cf.elements[n];if(!el.value.trim()){el.classList.add('invalid');ok=false}else el.classList.remove('invalid')});
 if(!ok)return;
 var t=cf.elements.message.value+'\n\n'+cf.elements.name.value+' / '+cf.elements.contact.value;
 window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(t),'_blank')})});
$$('.bform').forEach(function(bf){
 var wrap=bf.parentNode,steps=$$('.step',bf),dots=$$('.steps span',bf),cur=0,err=$('.err',bf),done=$('.done',wrap);
 var lang=wrap.closest('[data-lang]')?wrap.closest('[data-lang]').getAttribute('data-lang'):LG;var T=ST[lang];
 var show=function(i){cur=i;steps.forEach(function(s,k){s.classList.toggle('on',k===i)});dots.forEach(function(d,k){d.classList.toggle('on',k<=i)});window.scrollTo({top:Math.max(0,bf.getBoundingClientRect().top+window.scrollY-90),behavior:'smooth'})};
 var validate=function(i){var bad=0;$$('[required]',steps[i]).forEach(function(el){var v=el.type==='checkbox'?el.checked:el.value.trim();if(!v||(el.type==='email'&&!/^\S+@\S+\.\S+$/.test(el.value))){el.classList.add('invalid');bad++}else el.classList.remove('invalid')});
  err.hidden=!bad;err.textContent=bad?T.invalid:'';return!bad};
 $$('[data-next]',bf).forEach(function(b){b.addEventListener('click',function(){if(validate(cur))show(cur+1)})});
 $$('[data-prev]',bf).forEach(function(b){b.addEventListener('click',function(){show(cur-1)})});
 var today=new Date().toISOString().slice(0,10);bf.elements.from.min=today;bf.elements.to.min=today;
 bf.elements.from.addEventListener('change',function(){bf.elements.to.min=bf.elements.from.value});
 try{var s=JSON.parse(localStorage.getItem('bw_owner')||'{}');['owner','phone','email','address','vet'].forEach(function(k){if(s[k])bf.elements[k].value=s[k]})}catch(e){}
 bf.addEventListener('submit',function(e){e.preventDefault();if(!validate(2))return;
  var g=function(n){return(bf.elements[n].value||'').trim()},sv=bf.elements.service.value;
  try{localStorage.setItem('bw_owner',JSON.stringify({owner:g('owner'),phone:g('phone'),email:g('email'),address:g('address'),vet:g('vet')}))}catch(x){}
  var yn=function(c){return c?T.yes:T.no};
  var L=[T.title+' - Barkwood','',T.service+': '+sv,T.dates+': '+(g('from')||'-')+(g('to')?T.to+g('to'):''),g('days')?T.days+': '+g('days'):null,'',
   T.dog+': '+g('dog')+' ('+g('breed')+', '+g('age')+')',T.size+': '+g('size')+' | '+T.sex+': '+g('sex')+' | '+T.neut+': '+g('neutered'),
   T.vacc+': '+yn(bf.elements.vacc.checked)+' | '+T.par+': '+yn(bf.elements.parasite.checked),T.notes+': '+(g('notes')||'-'),
   '',T.owner+': '+g('owner'),T.phone+': '+g('phone'),T.email+': '+g('email'),T.addr+': '+(g('address')||'-'),T.vet+': '+(g('vet')||'-')].filter(function(x){return x!==null});
  var txt=L.join('\n');
  $('.summary',wrap).textContent=txt;
  $('.sendWa',wrap).href='https://wa.me/'+WA+'?text='+encodeURIComponent(txt);
  $('.sendMail',wrap).href='mailto:'+EMAIL+'?subject='+encodeURIComponent(T.subj+' - '+g('dog')+' ('+sv+')')+'&body='+encodeURIComponent(txt);
  bf.hidden=true;done.hidden=false;window.scrollTo({top:0,behavior:'smooth'})});
});
})();
