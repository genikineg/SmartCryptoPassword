os = require("os");
win = nw.Window.get();
gui = require("nw.gui");
clipboard = gui.Clipboard.get();

win.setShowInTaskbar(true);

var tray = new gui.Tray({ title: "SmartCryptoPassword", icon: "lock.png" });

tray.tooltip = "Show";

var menu = new gui.Menu();

menuSettings = new gui.MenuItem({ label: "Settings" });
menu.append(menuSettings);

menuSettings.click = function() {
  $(".getPasswordButton").fadeOut("slow", function() {});
  $(".modal-content-apps").fadeOut("slow", function() {});
  $(".settingsButton").fadeOut("slow", function() {});
  $(".modal-icons").fadeOut("slow", function() {});
  $(".modal-donations").fadeOut("slow", function() {});
  $(".modal-content-segetPasswordttings").fadeOut("slow", function() {});
  $(".modal-content-description").fadeOut("slow", function() {
    $(".modal-content-settings").fadeIn("slow", function() {});
  });
};

menuShow = new gui.MenuItem({ label: "Exit" });
menu.append(menuShow);

menuShow.click = function() {
  win.close();
};

tray.menu = menu;

var exec = require("child_process").exec;
var notifier = require("node-notifier");
var Agent = require("socks5-http-client/lib/Agent");
var request = require("request");
var cheerio = require("cheerio");

notifier.notify({
  title: "SmartCryptoPassword",
  message: "Start",
  sound: true,
  wait: false
});

tray.on("click", function() {
  win.show();
});
