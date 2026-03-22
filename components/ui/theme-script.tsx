export function ThemeScript() {
  const code = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var isLight = stored === 'light';
    if (isLight) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
