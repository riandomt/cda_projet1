function isVisible(elem){
  return elem && getComputedStyle(elem).display!=="none";
}

function openNavbar(){
  const navbar=document.querySelector('nav');
  if(!navbar)return;
  navbar.classList.toggle('open');
}

function openDropdown(event){
  event.preventDefault();
  const dropdown=event.currentTarget.closest('.dropdown');
  if(!dropdown)return;
  dropdown.classList.toggle('open');
}
