import { useEffect, useRef } from "react";

const useSmoothScroll = () => {
  const currentSectionRef = useRef(0);
  const isScrollingRef = useRef(false);
  const sections = useRef([]);

  useEffect(() => {
    sections.current = document.querySelectorAll(".assign-section");

    const scrollToSection = (index) => {
      if (isScrollingRef.current) return; // Evita múltiples desplazamientos rápidos
      if (index < 0 || index >= sections.current.length) return; // Evita valores fuera de rango

      isScrollingRef.current = true;
      sections.current[index].scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Duración del scroll antes de permitir otro evento
    };

    const handleScroll = (event) => {
      event.preventDefault();
      if (isScrollingRef.current) return;

      let newIndex = currentSectionRef.current;

      if (
        event.deltaY > 0 ||
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        // Scroll hacia abajo
        newIndex = Math.min(
          currentSectionRef.current + 1,
          sections.current.length - 1
        );
      } else if (
        event.deltaY < 0 ||
        event.key === "ArrowUp" ||
        event.key === "PageUp"
      ) {
        // Scroll hacia arriba
        newIndex = Math.max(currentSectionRef.current - 1, 0);
      }

      if (newIndex !== currentSectionRef.current) {
        currentSectionRef.current = newIndex;
        scrollToSection(newIndex);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("keydown", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleScroll);
    };
  }, []);

  return null;
};

export default useSmoothScroll;
