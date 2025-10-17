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



    const modal = document.getElementById('modal');
    const openBtn = document.getElementById('open-modal');

    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      modal.innerHTML = `
        <div class="modal-content">
          <button class="close-btn" id="close-modal">&times;</button>
          <h2>Prise de rendez-vous</h2>
          <form class="form">
            <div class="d-flex row">
              <div class="column pad">
                <label for="plate">Plaque d'immatriculation</label>
                <input required type="text" id="plate" name="plate" maxlength="10">
              </div>
              <div class="column pad">
                <label for="service">Prestation demandée</label>
                <select name="service" id="service" required>
                  <option value="">Choisir une prestation</option>
                  <option value="mecanique">Mécanique</option>
                  <option value="carrosserie">Carrosserie</option>
                  <option value="controle">Contrôle technique</option>
                  <option value="revision">Révision</option>
                </select>
              </div>
            </div>

            <div class="d-flex row">
              <div class="column pad">
                <label for="location">Localisation du garage</label>
                <input required type="text" value="11 rue René Descartes, 56890, Plescop" id="location" readonly>
              </div>
              <div class="column pad">
                <label for="meet">Date de rendez-vous</label>
                <select name="meet" id="meet" required>
                  <option value="">Choisir une date</option>
                  <option value="">Lundi 20 octobre à 8h00</option>
                  <option value="">Lundi 20 octobre à 9h30</option>
                  <option value="">Lundi 20 octobre à 11h00</option>
                  <option value="">Lundi 20 octobre à 11h30</option>
                </select>
              </div>
            </div>

            <div class="d-flex" style="justify-content:center;">
              <button type="submit">Prendre rendez-vous</button>
            </div>
          </form>
        </div>
      `;

      const closeBtn = document.getElementById('close-modal');
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.innerHTML = '';
      });

      const plate = document.querySelector("#plate");
      plate.addEventListener('input', () => {
        const raw = plate.value.replace(/-/g, '');
        if (raw.length === 2) {
          plate.value = raw + '-';
        } else if (raw.length === 6) {
          plate.value = raw.slice(0, 2) + '-' + raw.slice(2, 6) + '-';
        }
      });
    });