const themeRoot = document.documentElement;
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const themePreferenceKey = "template-theme";
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
let hasSavedTheme = false;
let savedTheme;

try {
  savedTheme = window.localStorage.getItem(themePreferenceKey);
  hasSavedTheme = savedTheme === "light" || savedTheme === "dark";
} catch (error) {
  console.error("Unable to read the saved theme preference.", error);
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  themeRoot.dataset.theme = theme;
  themeColorMeta.content = isDark ? "#191919" : "#ffffff";
}

applyTheme(hasSavedTheme ? savedTheme : systemThemeQuery.matches ? "dark" : "light");

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector("[data-theme-toggle]");

  if (!(themeToggle instanceof HTMLButtonElement)) {
    console.error("The theme toggle button is missing from the page.");
    return;
  }

  function updateThemeToggle(theme) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-checked", String(isDark));
    themeToggle.title = `Switch to ${isDark ? "light" : "dark"} theme`;
  }

  updateThemeToggle(themeRoot.dataset.theme);

  themeToggle.addEventListener("click", () => {
    const nextTheme = themeRoot.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    updateThemeToggle(nextTheme);
    hasSavedTheme = true;

    try {
      window.localStorage.setItem(themePreferenceKey, nextTheme);
    } catch (error) {
      console.error("Unable to save the theme preference.", error);
    }
  });

  systemThemeQuery.addEventListener("change", (event) => {
    if (!hasSavedTheme) {
      const theme = event.matches ? "dark" : "light";
      applyTheme(theme);
      updateThemeToggle(theme);
    }
  });
});
