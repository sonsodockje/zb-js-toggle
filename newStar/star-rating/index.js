const CSS_PATH = './star-rating/theme.css';

if (!document.querySelector(`link[href="${CSS_PATH}"]`)) {
  const $link = document.createElement("link");
  $link.rel = "stylesheet"; 
  $link.href = CSS_PATH;
  document.head.appendChild($link); 
}

function StarRating($container) {

    

    const maxRating = parseInt($container.dataset.maxRating)
    const $starRatingContainer = document.createElement("div")
    
    $starRatingContainer.classList.add("star-rating-container")
    
    for (let i = 0; i <= maxRating; i++) {
        const $i = document.createElement("i")
        $i.classList.add("bx", "bxs-star"); 
        $i.dataset.value = i+1;
        $starRatingContainer.appendChild($i)
    }

    $container.appendChild($starRatingContainer)
    const $iList = $starRatingContainer.querySelectorAll("i");

    // 호버
    $starRatingContainer.addEventListener("mouseover", (e) => {
        const value = parseInt(e.target.dataset.value);
        
            
        $iList.forEach((i, index) => {
            i.classList.toggle("hovered", index < value);
        });
    });

  
    $starRatingContainer.addEventListener("mouseleave", () => {
     
         $iList.forEach((i) => {
            i.classList.remove("hovered")
        })
    })

   
    
    // 선택
    $starRatingContainer.addEventListener("click", (e) => {

        const value = parseInt(e.target.dataset.value)
       

        for (let i = 0; i < $iList.length; i++) {
            $iList[i].classList.remove("selected")
        }

        for (let i = 0; i < value; i++) {
            $iList[i].classList.add("selected")
        }

      

      $starRatingContainer.dispatchEvent(new CustomEvent('rating-change', {
        detail: value,
        bubbles: true
      
    }));

    })


    
  
    


    
  

}



export {StarRating}