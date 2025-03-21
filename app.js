// do something!
const nav = document.querySelector("nav")
const main = document.querySelector("main")
const toggleBtn = document.querySelector(".toggle")

let localState = getState()

firstView()
    
toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("active")
    
    localState = localState === "closed" ? "open" : "closed"
    localStorage.setItem("toggleState", localState);
})

// document.addEventListener("DOMContentLoaded", function () {
//     setTimeout(() => {
//         document.body.classList.remove("preload");
//     }, 10)

// });


document.addEventListener("DOMContentLoaded", function () {
    requestAnimationFrame(() => {
        document.body.classList.remove("preload");
    });
})

function getState() {
  let localState = localStorage.getItem("toggleState");

  if (localState === null) { 
    localState = "closed";
    localStorage.setItem("toggleState", localState);
  }
    console.log(localState)
  return localState; 
}

function firstView() {
    if (localState === "closed") {
        nav.classList.remove("active")
            document.body.style.visibility = "visible";
    } else {
        nav.classList.add("active")
            document.body.style.visibility = "visible";
    }
}