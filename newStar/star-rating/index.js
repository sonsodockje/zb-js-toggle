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



// 수정된 주요 로직:

//     maxRating 및 루프: parseInt 보완, 별 개수 및 data-value가 1부터 maxRating까지 올바르게 생성되도록 루프 수정.
//     starIcons 배열: 별 요소 목록을 한 번만 찾아 배열에 저장 (starIcons). 이벤트 핸들러 안에서 매번 querySelectorAll 안 함.
//     mouseover: closest('i')로 별 확인, parseInt 추가, forEach와 toggle로 모든 별의 hovered 클래스 관리.
//     mouseleave: 컨테이너의 dataset.rating에서 현재 선택된 값을 읽어와서, 그 값을 기준으로 hovered 클래스 복원.
//     click:
//         closest('i')와 parseInt로 클릭된 값 확인.
//         dataset.rating에서 현재 값 읽어오기.
//         newRating 계산 (토글 로직 포함).
//         dataset.rating 업데이트.
//         forEach와 toggle로 selected 클래스 업데이트 (한 번의 루프로!).
//         hovered 클래스도 클릭된 상태와 일치하도록 업데이트.
//         CustomEvent의 detail에 newRating 전달.
//     초기 상태 설정: 페이지 로드 시 dataset.rating을 기준으로 초기 별 상태(selected, hovered) 설정.
//     Export 방식: export { StarRating } (named export)으로 수정함. 만약 app.js에서 import StarRating from ... (default import)를 쓴다면 export default function StarRating...으로 바꿔야 함.