let prevLengthOfTextarea = 0;
let defaultCharsLeft = 140;

$(document).ready(function() {
  $("form")
    .find("textarea")
    .keyup(function() {
      const charInTextarea = $(this).val().length;
      const charsLeft = defaultCharsLeft - charInTextarea;
      if (charInTextarea > defaultCharsLeft) {
        ["-", charsLeft].join("");
        $(this)
          .next()
          .find("output")
          .text(charsLeft)
          .css("color", "red");
      } else {
        $(this)
          .next()
          .find("output")
          .text(charsLeft)
          .css("color", "black");
      }
      $(this)
        .next()
        .find("output")
        .text(charsLeft);
    });
});
