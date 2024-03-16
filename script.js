document.addEventListener('DOMContentLoaded', (event) => {
    const modeSwitch = document.getElementById('modeSwitch');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        modeSwitch.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        modeSwitch.checked = false;
    }

    // Update icons according to the initial theme
    updateIcons(currentTheme === 'dark' ? 'dark' : 'light');

    modeSwitch.addEventListener('click', toggleMode);
});

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.getElementById('modeSwitch').checked = (theme === 'dark');

    // Update icons whenever the theme is toggled
    updateIcons(theme);
}

function updateIcons(theme) {
    var icons = document.querySelectorAll(".icon");

    icons.forEach(function (icon) {
        var src = icon.getAttribute("src");
        var newSrc = theme === 'dark' ? src.replace(".png", "-dm.png") : src.replace("-dm.png", ".png");

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
