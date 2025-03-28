// do something!
import { saveState, loadState } from "./state.js"

const $nav = document.querySelector("nav"); 
const $toggleBtn = document.querySelector("i")

let navState = false

window.addEventListener("DOMContentLoaded", () => {
    const loadLocalState = loadState();
    
    navState = loadLocalState === null ? false : loadLocalState.navState // 현재상태
    console.log("읽어온 객체" + navState)


    $nav.classList.toggle("active", navState)
    document.body.style.visibility = "visible";
 
    requestAnimationFrame(() => {
        document.body.classList.remove("preload");
    })
})

$toggleBtn.addEventListener("click", () => {
 
    navState = !navState
    $nav.classList.toggle("active", navState)


    // 확인 하기 쉽게 일단 여기 넣었습니다. 
    saveState({ "navState": navState })

})

// window.addEventListener("beforeunload", () => {
//     saveState({navState})
// })