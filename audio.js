let music = new Howl({
  src: ["https://cdn.jsdelivr.net/gh/madebykin/neocultural/healing-forest-187590.mp3"],
  onplay: () => {
    $(".audio_wrap").click();
  }
});

$(".audio_wrap").on("click", function () {
  $(this).toggleClass("muted");
  Howler.mute(!$(this).hasClass("muted"));
});

// Trigger the audio to play
music.play();
