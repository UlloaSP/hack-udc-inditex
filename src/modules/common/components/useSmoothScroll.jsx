// @ts-check
import { useEffect, useRef } from "react"; 
import { motion } from "framer-motion";

const useSmoothScroll = (numSections) => {
  const currentSectionRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const scrollToSection = (index) => {
      if (isScrollingRef.current) return; // Bloquea múltiples desplazamientos
      if (index < 0 || index >= numSections) return;

      isScrollingRef.current = true; // Bloquea el scroll mientras se anima

      window.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth",
      });

      setTimeout(() => {
        isScrollingRef.current = false; // Desbloquea el scroll después de 1.5s
      }, 1500); 
    };

    const handleScroll = (event) => {
      if (isScrollingRef.current) return;

      let newIndex = currentSectionRef.current;

      if (event.deltaY > 0 || event.key === "ArrowDown") {
        newIndex = Math.min(newIndex + 1, numSections - 1);
      } else if (event.deltaY < 0 || event.key === "ArrowUp") {
        newIndex = Math.max(newIndex - 1, 0);
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
  }, [numSections]);

  return null;
};

const ScrollPage = () => {
  const sections = ["Sección 1", "Sección 2", "Sección 3", "Sección 4"];

  useSmoothScroll(sections.length);

  return (
    <div>
      {sections.map((text, index) => (
        <motion.div
          key={index}
          className="h-screen flex items-center justify-center text-3xl font-bold"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
};

export default ScrollPage;