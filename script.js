(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var button = form.querySelector("button[type=submit]");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.className = "status";
    status.textContent = "";

    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = value; });
    if (data.botcheck) { return; }
    data.subject = "New inquiry from thechattertonhouse.com";
    data.from_name = "Chatterton House Website";

    button.disabled = true;
    button.textContent = "Sending";

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json && json.success) {
          form.reset();
          status.className = "status ok";
          status.textContent = "Thank you. Your message has been sent.";
        } else {
          throw new Error("send failed");
        }
      })
      .catch(function () {
        status.className = "status err";
        status.textContent = "Something went wrong. Please try again in a few minutes.";
      })
      .then(function () {
        button.disabled = false;
        button.textContent = "Send Message";
      });
  });
})();
