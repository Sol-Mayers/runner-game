import "./style.css";

import { Game } from "./game/Game.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <main class="app-shell">
    <section
      class="screen start-screen"
      id="start-screen"
      aria-labelledby="start-title"
    >
      <img
        class="start-label"
        src="assets/images/label.png"
        alt="Hoff"
      />

      <div class="bunting" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>

      <div class="start-content">

        <div class="living-room" aria-hidden="true">
          <img
            class="room-furniture"
            src="assets/images/furniture.png"
            alt=""
          />

          <img
            class="room-dog"
            src="assets/images/dog.png"
            alt=""
          />

          <img
            class="room-balloons"
            src="assets/images/baloons.png"
            alt=""
          />
        </div>

        <div class="start-card">
          <h2>В честь дня рождения Hoff<br />дома шумно и весело!</h2>
          <p>
            Даже корги решил побаловаться и побегать по квартире, 
            ведь кто-то повсюду разбросал сахарные косточки. Помогите 
            пушистику собрать лакомства и получите <b>1000</b> бонусов на покупки 
            в Hoff.
          </p>
          <button
            class="primary-button"
            id="show-rules"
            type="button"
          >
            Помочь корги
          </button>
        </div>

        <p class="promotion-disclaimer">
          Срок действия акции — с 15.04.2024 по 30.04.2024.
          Подробная информация
          <a href="#" class="promotion-disclaimer__link stub-link">
            об условиях проведения акции.
          </a>
          Реклама. Рекламодатель — ООО «Домашний Интерьер».
          ОГРН: 1077763747269.
        </p>
      </div>
    </section>

    <section
      class="screen rules-screen"
      id="rules-screen"
      aria-labelledby="rules-title"
      hidden
    >
      <img
        class="rules-label"
        src="assets/images/label.png"
        alt="Hoff"
      />

      <div class="rules-balloons" aria-hidden="true">
        <img
          src="assets/images/many-balloons.png"
          alt=""
        />
      </div>

      <div class="rules-card">
        <h2 class="rules-kicker" id="rules-title">
          Правила игры
        </h2>

        <div class="rules-list">
          <article class="rules-row">
            <div class="rules-icon" aria-hidden="true">
              <img
                src="assets/images/yellow-bone.png"
                alt=""
              />
            </div>

            <div class="rules-copy">
              <h3>Соберите лакомства</h3>
              <p>
                Пробегите 5 комнат и соберите 25 косточек.
              </p>
            </div>
          </article>

          <article class="rules-row">
            <div class="rules-icon" aria-hidden="true">
              <img
                src="assets/images/button.png"
                alt=""
              />
            </div>

            <div class="rules-copy">
              <h3>
                <span class="rules-copy-desktop">
                  Нажимайте на экран,
                </span>

                <span class="rules-copy-mobile">
                  Нажимайте на кнопку «Прыжок»,
                </span>
              </h3>

              <p>
                чтобы перепрыгнуть препятствия или достать
                до вкусняшки.
              </p>
            </div>
          </article>

          <article class="rules-row">
            <div class="rules-icon" aria-hidden="true">
              <img
                src="assets/images/display.png"
                alt=""
              />
            </div>

            <div class="rules-copy">
              <h3>Исследуйте всё</h3>
              <p>
                Прыгайте над небольшими предметами и залезайте
                на крупные, например, стол или диван.
              </p>
            </div>
          </article>
        </div>

        <div
          class="rules-rewards"
          aria-label="Награды за собранные косточки"
        >
          <article class="reward-card">
            <div class="reward-image-wrapper">
              <img
                class="reward-image reward-image--single"
                src="assets/images/bone.png"
                alt=""
              />
            </div>

            <h3 class="reward-title">
              0-14 </br>косточек
            </h3>

            <p class="reward-description">
              шанс переиграть
            </p>
          </article>

          <article class="reward-card">
            <div class="reward-image-wrapper">
              <img
                class="reward-image reward-image--many"
                src="assets/images/bones.png"
                alt=""
              />
            </div>

            <h3 class="reward-title">
              15-25  </br>косточек
            </h3>

            <p class="reward-description">
              1000 бонусов в подарок,
              и корги сыт!
            </p>
          </article>
        </div>

        <button
          class="primary-button rules-start-button"
          id="start-game"
          type="button"
        >
          Играть
        </button>
      </div>
    </section>

    <section
      class="screen play-screen"
      id="play-screen"
      aria-label="Игра «Супер Корги»"
      hidden
    >
      <div class="game-frame">
        <header class="game-header">
          <img
            class="game-logo"
            src="assets/images/hoff-transparent.png"
            alt="Hoff"
          />

          <div class="game-score" aria-live="polite">
            <img
              class="game-score-bone"
              src="assets/images/yellow-bone.png"
              alt=""
              aria-hidden="true"
            />
            <span id="bone-counter">0 / 3</span>
          </div>

          <span class="game-header-spacer" aria-hidden="true"></span>
        </header>

        <div
          class="game-stage"
          id="game-stage"
          aria-label="Игровое поле. Нажмите кнопку «Прыжок», чтобы прыгнуть."
        >
          <img
            class="level-image"
            src="assets/images/level.png"
            alt=""
            aria-hidden="true"
          />

          <div class="canvas-host" id="canvas-host"></div>

          <img
            class="game-dog"
            src="assets/images/action-dog.gif"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div class="mobile-jump-control">
          <button
            class="mobile-jump-button"
            id="jump-button"
            type="button"
            aria-label="Прыжок"
          >
            <img
              src="assets/images/arrow.png"
              alt=""
              aria-hidden="true"
            />
            <span>Прыжок</span>
          </button>
        </div>
        
      </div>
    </section>

    <section
      class="screen result-screen"
      id="result-screen"
      aria-labelledby="result-title"
      hidden
    >
      <img
        class="brand"
        src="assets/images/label.png"
        alt="Hoff"
      />

      <div class="bunting result-bunting" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>

      <div class="result-content">
        <h2 id="result-title">Забирай бонусы, хозяин!</h2>

        <p class="result-score">
          <img
            class="result-score-bone"
            src="assets/images/finish-bone.svg"
            alt=""
            aria-hidden="true"
          />
          <span id="result-count">3 из 3</span>
        </p>

        <p class="result-description">
          Отличная работа! Корги собрал все косточки.
          Оставь свой email, чтобы узнать о бонусах.
        </p>

        <form id="bonus-form" class="bonus-form" novalidate>
          <label class="visually-hidden" for="email">
            Адрес электронной почты
          </label>

          <div class="email-field" id="email-field">
            <input
              id="email"
              name="email"
              type="email"
              inputmode="email"
              autocomplete="email"
              placeholder="Введите email"
              aria-describedby="email-error"
              required
            />
            <span class="field-status" aria-hidden="true"></span>
          </div>

          <p
            class="field-error"
            id="email-error"
            aria-live="polite"
          ></p>

          <label class="consent">
            <input
              id="consent"
              name="consent"
              type="checkbox"
            />

            <span class="consent-mark" aria-hidden="true">
              <img
                src="assets/images/check.svg"
                alt=""
              />
            </span>

            <span class="consent-text">
              Соглашаюсь на получение рассылки и принимаю
              <a href="#" class="stub-link">условия использования</a>
              и
              <a href="#" class="stub-link">политику конфиденциальности</a>.
            </span>
          </label>

          <button
            class="primary-button result-button"
            id="submit-button"
            type="submit"
            disabled
          >
            Забрать бонусы
          </button>
        </form>

        <p class="share-caption">Поделиться с друзьями:</p>

        <div
          class="social-placeholders"
          aria-label="Поделиться в социальных сетях"
        >
          <a
            class="social-link"
            href="#"
            aria-label="Поделиться во ВКонтакте"
          >
            <img
              src="assets/images/vk.png"
              alt="VK"
            />
          </a>

          <a
            class="social-link"
            href="#"
            aria-label="Поделиться в Одноклассниках"
          >
            <img
              src="assets/images/ok.png"
              alt="OK"
            />
          </a>

          <a
            class="social-link"
            href="#"
            aria-label="Поделиться в Telegram"
          >
            <img
              src="assets/images/tg.png"
              alt="Telegram"
            />
          </a>

          <a
            class="social-link"
            href="#"
            aria-label="Поделиться в Viber"
          >
            <img
              src="assets/images/viber.png"
              alt="Viber"
            />
          </a>

          <a
            class="social-link"
            href="#"
            aria-label="Поделиться в WhatsApp"
          >
            <img
              src="assets/images/whatsapp.png"
              alt="WhatsApp"
            />
          </a>
        </div>
      </div>
    </section>
  </main>
`;

const screens = {
  start: document.querySelector("#start-screen"),
  rules: document.querySelector("#rules-screen"),
  play: document.querySelector("#play-screen"),
  result: document.querySelector("#result-screen"),
};

let game = null;

function showScreen(name) {
  for (const [screenName, element] of Object.entries(screens)) {
    element.hidden = screenName !== name;
  }

  window.scrollTo(0, 0);
}

document
  .querySelector("#show-rules")
  .addEventListener("click", () => showScreen("rules"));

document.querySelector("#start-game").addEventListener("click", () => {
  showScreen("play");

  requestAnimationFrame(() => {
    game?.destroy();

    const counter = document.querySelector("#bone-counter");

    game = new Game({
      container: document.querySelector("#canvas-host"),
      inputArea: document.querySelector("#game-stage"),
      jumpButton: document.querySelector("#jump-button"),
      counter,
      pauseButton: document.querySelector("#pause-button"),
      onComplete: (count) => {
        document.querySelector("#result-count").textContent = `${count} из 3`;

        game?.destroy();
        game = null;

        showScreen("result");
      },
    });
  });
});

const form = document.querySelector("#bonus-form");
const email = document.querySelector("#email");
const field = document.querySelector("#email-field");
const error = document.querySelector("#email-error");
const consent = document.querySelector("#consent");
const submitButton = document.querySelector("#submit-button");

let emailTouched = false;

function getEmailState() {
  const value = email.value.trim();

  if (!value) {
    return {
      valid: false,
      message: "Введите адрес электронной почты.",
    };
  }

  if (!email.validity.valid) {
    return {
      valid: false,
      message: "Проверьте правильность введенных данных.",
    };
  }

  return { valid: true, message: "" };
}

function updateForm() {
  const state = getEmailState();
  const hasValue = email.value.trim().length > 0;

  field.classList.toggle("is-valid", hasValue && state.valid);
  field.classList.toggle("is-invalid", emailTouched && !state.valid);

  email.setAttribute("aria-invalid", String(emailTouched && !state.valid));

  error.textContent = emailTouched && !state.valid ? state.message : "";

  submitButton.disabled = !(state.valid && consent.checked);
}

email.addEventListener("input", updateForm);

email.addEventListener("blur", () => {
  emailTouched = true;
  updateForm();
});

consent.addEventListener("change", updateForm);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  emailTouched = true;
  updateForm();

  if (submitButton.disabled) {
    email.focus();
    return;
  }
});

document.querySelectorAll(".stub-link").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    game?.destroy();
  });
}
