$(document).ready(function () {
  var myWindow = $("#window"),
    undo = $("#undo");

  undo.click(function () {
    myWindow.data("kendoWindow").open();
    undo.fadeOut();
  });

  function onClose() {
    undo.fadeIn();
  }

  myWindow
    .kendoWindow({
      width: "600px",
      title: "About Alvar Aalto",
      visible: false,
      actions: ["Pin", "Minimize", "Maximize", "Close"],
      close: onClose,
    })
    .data("kendoWindow")
    .center()
    .open();
});
