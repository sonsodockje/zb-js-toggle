const STAR_RATING_THEME_PATH = './star-rating/theme.css';
let isCssLoaded = false;


export default function StarRating(container) {
    console.log(container)
    

  if (!isCssLoaded) {
    loadCSS();
    isCssLoaded = true;
  }

    // 수 읽어 들이고 별 배열에 요소 넣기
    container.classList.add('star-rating-container');
    const maxRating = parseInt(container.dataset.maxRating);
    const starIcons = createStarIcons(maxRating);

    // 별 뿌리기
    container.innerHTML = '';
    starIcons.forEach(star => container.appendChild(star));

    // 사용자 별 초기화 
  let currentRating = 0;

    // -----------------------------------------------------------------

  const highlightStars = (rating) => {
    starIcons.forEach((star, index) => {
      star.classList.toggle('hovered', index < rating);
    });
  };

  const updateSelectedStars = (rating) => {
    starIcons.forEach((star, index) => {
      star.classList.toggle('selected', index < rating);
    });
  };

    // -----------------------------------------------------------------

  container.addEventListener('mouseover', (e) => {
    const star = e.target.closest('i');
    if (!star || !container.contains(star)) return;
    highlightStars(parseInt(star.dataset.value, 10));
  });

  container.addEventListener('mouseout', () => {
    highlightStars(currentRating);
  });

  container.addEventListener('click', (e) => {
    const star = e.target.closest('i');
    if (!star || !container.contains(star)) return;

    const clickedRating = parseInt(star.dataset.value, 10);
    currentRating = (clickedRating === currentRating) ? 0 : clickedRating;
    updateSelectedStars(currentRating);

    container.dispatchEvent(new CustomEvent('rating-change', {
      detail: currentRating
    }));
  });
    // -----------------------------------------------------------------
  updateSelectedStars(currentRating);
}

// css 로드 하기.
function loadCSS() {
        if (document.querySelector(`link[href="${STAR_RATING_THEME_PATH}"]`)) {
    return;
  }
    
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = STAR_RATING_THEME_PATH;
  document.head.appendChild(link);
}

// 별 배열 만들기.
function createStarIcons(maxRating) {
  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    const star = document.createElement('i');
    star.className = 'bx bxs-star';
    star.dataset.value = i;
    stars.push(star);
  }
  return stars;
}