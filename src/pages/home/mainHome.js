export default () => {
  const btnMenu = document.getElementById('btnMobile');
  const container = document.createElement('div');
  container.classList.add('containerMain');

  const template = `
  <h1 class="titleHome">Comente seus filmes favoritos</h1>
  <div class="containerAbout">
    <p>O Pop Time é uma rede social onde é possível recomendar, criticar, e
      ter acessor aos filmes e séries que desejamos por meio de compartilhamentos de todos os amantes da mídia</p>
    <div class="carrosel">
    <ul>
      <li>
        <img class="imgCarrosel" src="images/img/interestelar.jpg">
      </li>
      <li>
        <img class="imgCarrosel" src="images/img/breackingbad.jpg">
      </li>
      <li>
        <img class="imgCarrosel" src="images/img/coraline.jpg">
      </li>
      <li>
        <img class="imgCarrosel" src="images/img/harrypotter.jpg">
      </li>
      <li>
        <img class="imgCarrosel" src="images/img/peakyblinders.jpg">
      </li>
    </ul>
  </div>
  </div>
  <div id="enter" class="enter">
    <a href="#login" class="btn">
    <button class="botaoLogIn" id="botaoLogIn" href="/#login">Log-in</button>
    </a>
    <a href="#register" class="btn">
    <button class="button-register" id="buttonRegister">Cadastre-se</button>
    </a>
  </div>
  `;

  container.innerHTML = template;
  btnMenu.classList.add('out');
  return container;
};
