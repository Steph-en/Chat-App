/**
 * Easy on scroll event listener
 */
const onscroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

/**
   * Sidebar toggle
   */
  if (select('.toggle-sidebar-btn')) {
    on('click', '.toggle-sidebar-btn', function(e) {
      select('body').classList.toggle('toggle-sidebar')
    })
  }

/**
 * Initiate Bootstrap validation check
 */
var needsValidation = document.querySelectorAll(".needs-validation");

Array.prototype.slice.call(needsValidation).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    },
    false
  );
});

const addForm = document.querySelector("form.add");
const addLable = document.querySelector("label.add");
const dropLable = document.querySelector("label.drop");

dropLable.onclick = () => {
  addForm.style.marginLeft = "-50%";
};

addLable.onclick = () => {
  addForm.style.marginLeft = "0%";
};

function myfun() {
  var x = document.querySelectorAll("form.dropSection");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
