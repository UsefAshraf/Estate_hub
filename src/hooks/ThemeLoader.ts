export function loadTheme() {
  const saved = localStorage.getItem("theme");

  // If saved: use it
  if (saved === "dark" || saved === "light") {
    document.documentElement.classList.toggle("dark", saved === "dark");
    return saved;
  }

  // If no saved theme: check system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  document.documentElement.classList.toggle("dark", prefersDark);
  return prefersDark ? "dark" : "light";
}
