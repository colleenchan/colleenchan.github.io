document.addEventListener('DOMContentLoaded', (event) => {
    const modeSwitch = document.getElementById('modeSwitch');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        modeSwitch.checked = true; // Ensures slider reflects dark mode is on
    } else {
        modeSwitch.checked = false; // Reflects dark mode is off
    }
    
    modeSwitch.addEventListener('click', toggleMode);
});

function toggleMode() {
  document.body.classList.toggle('dark-mode');

  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);

  // Update the slider based on the dark mode status
  document.getElementById('modeSwitch').checked = (theme === 'dark');

  var icons = document.querySelectorAll(".icon");

  icons.forEach(function (icon) {
    var src = icon.getAttribute("src");
    var newSrc = theme === 'dark' ? src.replace(".png", "-dm.png") : src.replace("-dm.png", ".png");

    // Check if the new image source exists before setting it
    var img = new Image();
    img.onload = function() {
      icon.setAttribute("src", newSrc);
    };
    img.onerror = function() {
      console.error("Failed to load image: " + newSrc);
    };
    img.src = newSrc;
  });
}



