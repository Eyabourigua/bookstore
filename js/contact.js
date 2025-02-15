const btnSubmit = document.getElementById("submit-contact");
btnSubmit.addEventListener("click", submitForm);

function submitForm(event) {
  event.preventDefault();

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg").value;
  if (firstname && lastname && email && msg) {
    alert(
      `Thank you ${firstname} ${lastname} for your message. We will get back to you soon.`
    );
  } else {
    alert("Please fill all fields");
  }
}
