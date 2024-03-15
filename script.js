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

$(function() {
  $(".abstract-link").click(function(e) {
    e.preventDefault();
    var $parent = $(this).parent();
    $(this).find(".chevron").toggleClass("bottom");
    $parent.siblings(".abstract").slideToggle(30);
    $parent.siblings(".bibtex").slideUp(30);
    $parent.find(".bibtex-link .chevron").addClass("bottom");
  });

  $(".bibtex-link").click(function(e) {
    e.preventDefault();
    var $parent = $(this).parent();
    $(this).find(".chevron").toggleClass("bottom");
    $parent.siblings(".bibtex").slideToggle(30);
    $parent.siblings(".abstract").slideUp(30);
    $parent.find(".abstract-link .chevron").addClass("bottom");
  });

  $("#publications .pdf-link a").on("mousedown", function(e) {
    var url = $(this).attr("href");
    ga("send", "pageview", url);
  });
});

