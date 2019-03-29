$(document).ready(function() {
  mapPasswordSha = [];

  $.ajax({
    dataType: "json",
    url: "/js/mapPasswordSha.json",
    success: data => {
      mapPasswordSha = data;
    },
    error: data => {
      alert("error mapPasswordSha.json");
    }
  });

  $(".hide").click(function() {
    win.hide();
  });

  $(".settingsButton").click(function() {
    $(".getPasswordButton").fadeOut("slow", function() {});
    $(".modal-content-apps").fadeOut("slow", function() {});
    $(".settingsButton").fadeOut("slow", function() {});
    $(".modal-icons").fadeOut("slow", function() {});
    $(".modal-donations").fadeOut("slow", function() {});
    $(".modal-content-segetPasswordttings").fadeOut("slow", function() {});
    $(".modal-content-description").fadeOut("slow", function() {
      $(".modal-content-settings").fadeIn("slow", function() {});
    });
  });

  $(".backSettingsPassword").click(function() {
    $(".modal-content-settings").fadeOut("slow", function() {
      $(".modal-content-description").fadeIn("slow", function() {});
      $(".getPasswordButton").fadeIn("slow", function() {});
      $(".modal-content-apps").fadeIn("slow", function() {});
      $(".settingsButton").fadeIn("slow", function() {});
      $(".modal-icons").fadeIn("slow", function() {});
      $(".modal-donations").fadeIn("slow", function() {});
      $(".modal-content-segetPasswordttings").fadeIn("slow", function() {});
      $(".modal-content-apps-placeholder").fadeIn("slow", function() {});
      $(".modal-content-apps-popup-add-app").fadeOut("slow", function() {});
    });
  });

  $(".savePasswordButton").click(function() {
    $(".modal-content-settings").fadeOut("slow", function() {
      $(".modal-content-description").fadeIn("slow", function() {});
      $(".getPasswordButton").fadeIn("slow", function() {});
      $(".modal-content-apps").fadeIn("slow", function() {});
      $(".settingsButton").fadeIn("slow", function() {});
      $(".modal-icons").fadeIn("slow", function() {});
      $(".modal-donations").fadeIn("slow", function() {});
      $(".modal-content-segetPasswordttings").fadeIn("slow", function() {});
    });
    password = CryptoJS.AES.encrypt(
      JSON.stringify({
        password: $(".password")
          .val()
          .toString()
      }),
      $(".pincode")
        .val()
        .toString()
    ).toString();
    $(".password").val(
      CryptoJS.AES.decrypt(
        CryptoJS.AES.encrypt(
          $(".password")
            .val()
            .toString(),
          $(".pincode")
            .val()
            .toString()
        ).toString(),
        $(".pincode")
          .val()
          .toString()
      ).toString(CryptoJS.enc.Utf8)
    );
    $(".password").val("");
    $(".pincode").val("");
  });

  $(".number").click(function() {
    addnumbertopincode($(this).attr("number"));
  });

  $(".backAddApp").click(function() {
    $(".modal-content-apps-popup-add-app").fadeOut("slow", function() {
      $(".modal-content-description").fadeIn("slow", function() {});
      $(".getPasswordButton").fadeIn("slow", function() {});
      $(".modal-content-apps").fadeIn("slow", function() {});
      $(".settingsButton").fadeIn("slow", function() {});
      $(".modal-icons").fadeIn("slow", function() {});
      $(".modal-donations").fadeIn("slow", function() {});
      $(".modal-content-segetPasswordttings").fadeIn("slow", function() {});
      $(".modal-content-apps-placeholder").fadeIn("slow", function() {});
      $(".modal-content-apps-popup-add-app").fadeOut("slow", function() {});
    });
  });

  $(".saveAddAppButton").click(function() {
    $(".modal-content-settings").fadeOut("slow", function() {
      $(".modal-content-description").fadeIn("slow", function() {});
      $(".getPasswordButton").fadeIn("slow", function() {});
      $(".modal-content-apps").fadeIn("slow", function() {});
      $(".settingsButton").fadeIn("slow", function() {});
      $(".modal-icons").fadeIn("slow", function() {});
      $(".modal-donations").fadeIn("slow", function() {});
      $(".modal-content-segetPasswordttings").fadeIn("slow", function() {});
      $(".modal-content-apps-placeholder").fadeIn("slow", function() {});
      $(".modal-content-apps-popup-add-app").fadeOut("slow", function() {});
    });
  });
});

let password = null;

getPassword = appOrSite => {
  if (password != null) {
    try {
      let data = JSON.parse(
        CryptoJS.AES.decrypt(
          password,
          $(".pincode")
            .val()
            .toString()
        ).toString(CryptoJS.enc.Utf8)
      );
      var $temp = $("<input style='display:block;width: 50px;height: 1px;'>");
      $("body").append($temp);
      let passwordapp = CryptoJS.SHA3(data.password + appOrSite).toString();
      for (let key in mapPasswordSha) {
        passwordapp = passwordapp.replace(
          mapPasswordSha[key].key,
          mapPasswordSha[key].value
        );
      }
      passwordapp = passwordapp.substr(0, 56);
      $temp.val(passwordapp).select();
      document.execCommand("copy");
      $temp.remove();
      data = null;
      let audio = new Audio("/sound/Notify.ogg");
      audio.play();
      $(".successfullyGetPassword").fadeIn("slow", function() {
        setTimeout(() => {
          $(".successfullyGetPassword").fadeOut("slow", function() {
            setTimeout(() => {
              $(".pincode").val("");
              clipboard.set("SmartCryptoPassword");
            }, 1000 * 15);
          });
        }, 1000);
      });
      clipboard.set(passwordapp);
      passwordapp = null;
    } catch (err) {
      $(".failGetPassword").fadeIn("slow", function() {
        setTimeout(() => {
          $(".failGetPassword").fadeOut("slow", function() {});
        }, 1000);
      });
    }
  } else {
    $(".getPasswordButton").fadeOut("slow", function() {});
    $(".modal-content-apps").fadeOut("slow", function() {});
    $(".settingsButton").fadeOut("slow", function() {});
    $(".modal-icons").fadeOut("slow", function() {});
    $(".modal-donations").fadeOut("slow", function() {});
    $(".modal-content-segetPasswordttings").fadeOut("slow", function() {});
    $(".modal-content-description").fadeOut("slow", function() {
      $(".modal-content-settings").fadeIn("slow", function() {});
    });
  }
};

var pincode = "";

generationNumbersKeys = () => {
  $(".numbers").html("");

  let numbersKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  let compareRandom = function(a, b) {
    return Math.random() - 0.5;
  };

  numbersKeys.sort(compareRandom);

  let n = 0;

  for (let keyNumbersKeys in numbersKeys) {
    n++;

    if (n == 10) {
      let elementreloadpincode = $(".numbers").append(
        '<div class="reload-pincode"><img src="/img/reload.png"></div>'
      );
    }

    let element = $(".numbers").append(
      '<div class="number" number="' +
        numbersKeys[keyNumbersKeys] +
        '">' +
        numbersKeys[keyNumbersKeys] +
        "</div>"
    );
  }

  let elementbackpincode = $(".numbers").append(
    '<div class="back-pincode"><img src="/img/left-arrow.png"></div>'
  );

  $(".number").click(function() {
    addnumbertopincode($(this).attr("number"));
  });

  $(".reload-pincode").click(function() {
    generationNumbersKeys();

    pincode = "";

    $(".pincode").val(pincode);
  });

  $(".back-pincode").click(function() {
    if (pincode.length > 0) {
      pincode = pincode.substr(0, pincode.length - 1);

      $(".pincode").val(pincode);

      generationNumbersKeys();
    }
  });
};

$(document).ready(function() {
  generationNumbersKeys();

  if (typeof nw !== "undefined") {
    $(".hide").show();

    $("body").css("background-color", "rgba(58, 58, 58, 0.9)");
    $("body").css("overflow", "hidden");
  } else {
    $(".modal-content-apps").hide();
  }
});

addnumbertopincode = function(number) {
  generationNumbersKeys();

  pincode = pincode + number;

  $(".pincode").val(pincode);

  if (
    pincode.length > 3 &&
    $(".modal-content-settings").css("display") == "none"
  ) {
    chrome.tabs.getSelected(null, function(tab) {
      var parser = document.createElement("a");
      parser.href = tab.url;
      getPassword(parser.hostname);
    });

    if (typeof nw !== "undefined") {
      getPassword(appName);
    }
  }
};

indexOfSearch = (data, search) => {
  if (data.indexOf(search) != -1) {
    return true;
  } else {
    return false;
  }
};

/* for desktop */

appName = "";
lastAppName = "Select app";

$(".modal-content-apps-placeholder").click(function() {
  if ($(".modal-content-apps-array").css("display") == "none") {
    $(".modal-content-apps-array").fadeIn("fast", function() {});
    $(".modal-content-apps-placeholder").addClass(
      "modal-content-apps-placeholder-open"
    );
  } else {
    $(".modal-content-apps-array").fadeOut("fast", function() {});
    $(".modal-content-apps-placeholder-open").removeClass(
      "modal-content-apps-placeholder-open"
    );
  }
});

$(".saveAddAppButton").click(function() {
  let arr = [];

  if (localStorage.getItem("apps") != null) {
    arr = JSON.parse(localStorage.getItem("apps"));
  }

  arr.push(
    $(".modal-content-apps-popup-add-app-name")
      .val()
      .toString()
  );

  localStorage.setItem("apps", JSON.stringify(arr));

  $(".modal-content-apps-popup-add-app-name").val("");

  makeModalContentAppsArrayObject();
});

makeModalContentAppsArrayObject = () => {
  $(".modal-content-apps-array").html("");

  if (localStorage.getItem("apps") != null) {
    try {
      let data = JSON.parse(localStorage.getItem("apps"));

      for (let key in data) {
        $(".modal-content-apps-array").append(
          '<div class="modal-content-apps-array-object"><div class="modal-content-apps-array-object-name">' +
            data[key] +
            '</div><div class="modal-content-apps-array-object-delete"></div></div>'
        );
      }
    } catch (err) {
      $(".failGetPassword").fadeIn("slow", function() {
        setTimeout(() => {
          $(".failGetPassword").fadeOut("slow", function() {});
        }, 1000);
      });
    }
  }

  $(".modal-content-apps-array").append(
    '<div class="modal-content-apps-array-object modal-content-apps-array-object-add">Add app</div>'
  );

  $(".modal-content-apps-array-object").click(function() {
    lastAppName = $(".modal-content-apps-placeholder").html();
    $(".modal-content-apps-array").fadeOut("fast", function() {});
    $(".modal-content-apps-placeholder-open").removeClass(
      "modal-content-apps-placeholder-open"
    );
    $(".modal-content-apps-placeholder").html(
      $(this)
        .find(".modal-content-apps-array-object-name")
        .html()
    );
    appName = $(this)
      .find(".modal-content-apps-array-object-name")
      .html();
  });

  $(".modal-content-apps-array-object-add").click(function() {
    $(".modal-content-apps-array").fadeOut("slow", function() {});
    $(".getPasswordButton").fadeOut("slow", function() {});
    $(".settingsButton").fadeOut("slow", function() {});
    $(".modal-icons").fadeOut("slow", function() {});
    $(".modal-donations").fadeOut("slow", function() {});
    $(".modal-content-segetPasswordttings").fadeOut("slow", function() {
      $(".modal-content-apps-popup-add-app").fadeIn("slow", function() {});
      $(".modal-content-apps-placeholder").fadeOut("slow", function() {});
    });
  });

  $(".modal-content-apps-array-object-delete").click(function() {
    setTimeout(() => {
      let last = lastAppName;
      $(".modal-content-apps-placeholder").html(last);
    }, 10);
    let appnamedelete = $(this)
      .parent()
      .find(".modal-content-apps-array-object-name")
      .html();
    if (localStorage.getItem("apps") != null) {
      try {
        let data = JSON.parse(localStorage.getItem("apps"));
        for (let i = 0; i < data.length; i++) {
          if (data[i] == appnamedelete) {
            data.splice(i, 1);
            localStorage.setItem("apps", JSON.stringify(data));
            makeModalContentAppsArrayObject();
          }
        }
      } catch (err) {
        $(".failGetPassword").fadeIn("slow", function() {
          setTimeout(() => {
            $(".failGetPassword").fadeOut("slow", function() {});
          }, 1000);
        });
      }
    }
  });
  $(".modal-content-apps-array-object")
    .mouseenter(function() {
      $(this)
        .find(".modal-content-apps-array-object-delete")
        .show();
    })
    .mouseleave(function() {
      $(this)
        .find(".modal-content-apps-array-object-delete")
        .hide();
    });
};

makeModalContentAppsArrayObject();

$(document).mouseup(function(e) {
  var container = $(".modal-content-apps");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    $(".modal-content-apps-array").hide();
    $(".modal-content-apps-placeholder-open").removeClass(
      "modal-content-apps-placeholder-open"
    );
  }
});
