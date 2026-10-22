(() => {
  const storageKey = "template-color-theme";
  const preferences = ["system", "light", "dark"];
  const root = document.documentElement;
  const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

  function isPreference(value) {
    return preferences.includes(value);
  }

  function readPreference() {
    try {
      const storedPreference = window.localStorage.getItem(storageKey);
      return isPreference(storedPreference) ? storedPreference : "system";
    } catch (error) {
      console.warn("Unable to read the saved color theme preference.", error);
      return "system";
    }
  }

  let preference = readPreference();

  function applyTheme() {
    const theme =
      preference === "system"
        ? systemPreference.matches
          ? "dark"
          : "light"
        : preference;

    root.dataset.theme = theme;
  }

  function syncSelector() {
    const selector = document.getElementById("theme-select");

    if (selector instanceof HTMLSelectElement) {
      selector.value = preference;
    }
  }

  function setPreference(nextPreference) {
    if (!isPreference(nextPreference)) {
      throw new TypeError(`Unsupported color theme preference: ${nextPreference}`);
    }

    preference = nextPreference;

    try {
      window.localStorage.setItem(storageKey, preference);
    } catch (error) {
      console.warn("Unable to save the color theme preference.", error);
    }

    applyTheme();
    syncSelector();
  }

  applyTheme();

  window.themeController = Object.freeze({
    getPreference: () => preference,
    setPreference,
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncSelector, { once: true });
  } else {
    syncSelector();
  }

  document.addEventListener("change", (event) => {
    const target = event.target;

    if (target instanceof HTMLSelectElement && target.id === "theme-select") {
      setPreference(target.value);
    }
  });

  systemPreference.addEventListener("change", () => {
    if (preference === "system") {
      applyTheme();
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey) {
      return;
    }

    preference = isPreference(event.newValue) ? event.newValue : "system";
    applyTheme();
    syncSelector();
  });
})();
