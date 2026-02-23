chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "enableRu") {
    enableRussianSubtitles();
  }
});

async function enableRussianSubtitles() {

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // 1️⃣ Включить субтитры
  const ccButton = document.querySelector('.ytp-subtitles-button');
  if (ccButton && ccButton.getAttribute("aria-pressed") === "false") {
    ccButton.click();
    await wait(600);
  }

  // 2️⃣ Открыть настройки
  document.querySelector('.ytp-settings-button')?.click();
  await wait(600);

  // 3️⃣ Открыть "Субтитры"
  const menuItems = [...document.querySelectorAll('.ytp-menuitem')];
  const subtitlesItem = menuItems.find(el =>
    el.innerText.includes("Субтитры")
  );

  if (!subtitlesItem) return;
  subtitlesItem.click();
  await wait(600);

  // 4️⃣ Нажать "Перевести"
  const translateItem = [...document.querySelectorAll('.ytp-menuitem')]
    .find(el => el.innerText.includes("Перевести"));

  if (!translateItem) return;
  translateItem.click();
  await wait(600);

  // 5️⃣ Выбрать "Русский"
  const russianItem = [...document.querySelectorAll('.ytp-menuitem')]
    .find(el => el.innerText.trim() === "Русский");

  if (russianItem) russianItem.click();
}
