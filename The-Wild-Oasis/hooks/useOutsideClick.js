import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      // Перевірка, чи клік за межами елемента, на який прикріплений ref
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("Click outside!");
        handler();
      }
    }

    // Додаємо обробник події для кліку на документ
    document.addEventListener("click", handleClick, listenCapturing);

    // Очищення події при демонтажі компонента
    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]); // Слухаємо зміни на handler та listenCapturing

  return ref; // Повертаємо ref для прив'язки до елемента
}

export default useOutsideClick;
