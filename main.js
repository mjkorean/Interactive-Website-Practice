(() => {
  const actions = {
    birdFlies(key) {
      if (key) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
    birdFlies2(key) {
      if (key) {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(${window.innerWidth}px, ${
          -window.innerHeight * 0.7
        }px)`;
      } else {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
  };

  const stepElems = document.querySelectorAll(".step");
  const graphicElems = document.querySelectorAll(".graphic-item");
  let currentItem = graphicElems[0];
  // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정하는 변수
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
    // 숫자로 된 문자열을 숫자로 변환 = * 1(곱하기 1)
    // 크롬 개발자 도구: 검정,하얀색 = 문자열 / 파란색 = 숫자열
    console.log(ioIndex);
  });
  /* IntersectionObserver 객체가 observe로 관찰하는 대상이 되는 객체들이 사라지거나 나타날때, 그 시점마다 콜백함수가 실행된다.
  IntersectionObserver를 이용하면 현재 어떤것이 보이는지, 몇번째 인덱스에 해당하는 스텝이 보이는지를 알 수 있다. */

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    // stepElems[i].setAttribute("data-index", i);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  function activate(action) {
    currentItem.classList.add("visible");
    if (action) {
      actions[action](true);
    }
    // 활성화
  }

  function inactivate(action) {
    currentItem.classList.remove("visible");
    if (action) {
      actions[action](false);
    }
    // 비활성화
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;

    // for (let i = 0; i < stepElems.length; i++) {
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue; // 만약 step의 값이 없다면, continue로 패스하고 다음 턴을 돌린다.
      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate();

        currentItem = graphicElems[step.dataset.index];
        activate(currentItem.dataset.action);
      }
    }
  });

  window.addEventListener("load", () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });
  // scrollTo = 새로고침 했을때, 페이지 가장 위로 올라감
  // setTimeout = 동작의 실행을 늦춰줌

  activate();
})();
