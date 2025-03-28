const CSS_PATH = './star-rating/theme.css';

if (!document.querySelector(`link[href="${CSS_PATH}"]`)) {
    const $link = document.createElement("link");
    $link.rel = "stylesheet";
    $link.href = CSS_PATH;
    document.head.appendChild($link);
}

function StarRating($container) {
    const maxRating = parseInt($container.dataset.maxRating || '5', 10);
    const $starRatingContainer = document.createElement("div");
    $starRatingContainer.classList.add("star-rating-container");
    $starRatingContainer.dataset.rating = "0"; // 초기 선택값 저장

    const starIcons = [];
    for (let i = 1; i <= maxRating; i++) {
        const $i = document.createElement("i");
        $i.classList.add("bx", "bxs-star");
        $i.dataset.value = i;
        $starRatingContainer.appendChild($i);
        starIcons.push($i); // 아이콘 목록 저장
    }

    $container.innerHTML = '';
    $container.appendChild($starRatingContainer);

    $starRatingContainer.addEventListener("mouseover", (e) => {
        const star = e.target.closest('i');
        if (!star || !$starRatingContainer.contains(star)) return;
        const hoverRating = parseInt(star.dataset.value, 10);
        if (isNaN(hoverRating)) return;

        starIcons.forEach((icon, index) => {
            icon.classList.toggle("hovered", index < hoverRating);
        });
    });

    $starRatingContainer.addEventListener("mouseleave", () => {
        const currentRating = parseInt($starRatingContainer.dataset.rating || "0", 10);
        starIcons.forEach((icon, index) => {
            icon.classList.toggle("hovered", index < currentRating);
        });
    });

    $starRatingContainer.addEventListener("click", (e) => {
        const star = e.target.closest('i');
        if (!star || !$starRatingContainer.contains(star)) return;
        const clickedRating = parseInt(star.dataset.value, 10);
        if (isNaN(clickedRating)) return;

        let currentRating = parseInt($starRatingContainer.dataset.rating || "0", 10);
        const newRating = (clickedRating === currentRating) ? 0 : clickedRating;

        $starRatingContainer.dataset.rating = newRating.toString();

        starIcons.forEach((icon, index) => {
            icon.classList.toggle("selected", index < newRating);
            icon.classList.toggle("hovered", index < newRating); // 클릭 후 호버 상태도 업데이트
        });

        $starRatingContainer.dispatchEvent(new CustomEvent('rating-change', {
            detail: newRating,
            bubbles: true
        }));
    });

    // 초기 상태 적용
    const initialRating = parseInt($starRatingContainer.dataset.rating || "0", 10);
    starIcons.forEach((icon, index) => {
        icon.classList.toggle('selected', index < initialRating);
        icon.classList.toggle('hovered', index < initialRating);
    });
}

// export default StarRating; // export 방식은 필요에 따라 default 또는 named 선택
export { StarRating }; // Named export 예시