let lastVideoUrl = null;

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function enableRussianSubtitles() {

  const ccButton = document.querySelector('.ytp-subtitles-button');
  if (ccButton && ccButton.getAttribute("aria-pressed") === "false") {
    ccButton.click();
    await wait(500);
  }

  document.querySelector('.ytp-settings-button')?.click();
  await wait(500);

  const subtitlesItem = [...document.querySelectorAll('.ytp-menuitem')]
    .find(el => el.innerText.includes("Субтитры"));

  if (!subtitlesItem) return;
  subtitlesItem.click();
  await wait(500);

  const translateItem = [...document.querySelectorAll('.ytp-menuitem')]
    .find(el => el.innerText.includes("Перевести"));

  if (!translateItem) return;
  translateItem.click();
  await wait(500);

  const russianItem = [...document.querySelectorAll('.ytp-menuitem')]
    .find(el => el.innerText.trim() === "Русский");

  if (russianItem) russianItem.click();
}

// 🔎 Отслеживание смены видео (SPA)
function checkForVideoChange() {
  const currentUrl = window.location.href;

  if (currentUrl.includes("watch") && currentUrl !== lastVideoUrl) {
    lastVideoUrl = currentUrl;

    setTimeout(() => {
      enableRussianSubtitles();
    }, 2000); // даём плееру полностью загрузиться
  }
}

// Проверка каждые 1.5 сек
setInterval(checkForVideoChange, 1500);