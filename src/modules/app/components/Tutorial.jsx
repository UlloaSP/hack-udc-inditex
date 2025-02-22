import { useEffect, useState } from "react";

const Tutorial = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState("");
  const textSteps = [
    "Encuentra los artículos que buscas en un clic o con una simple foto." +
      "Nuestro buscador te ayudará a descubrir las mejores opciones para que siempre estés a la última." +
      "Escribe una breve descripción del producto que tienes en mente y te mostraremos artículos similares disponibles en nuestras tiendas." +
      "¿Prefieres una búsqueda más visual? Sube una imagen y deja que nuestro sistema encuentre lo que buscas al instante.",
  ];

  useEffect(() => {
    const video = document.getElementById("tutorial-video");
    if (!video) return;

    const timeMarkers = [0, 5, 10, 15];

    const updateText = () => {
      for (let i = 0; i < timeMarkers.length; i++) {
        if (video.currentTime >= timeMarkers[i] && textIndex !== i) {
          setText(""); // Reinicia el texto para la animación
          setTextIndex(i);
        }
      }
    };

    video.addEventListener("timeupdate", updateText);
    return () => video.removeEventListener("timeupdate", updateText);
  }, [textIndex]);

  useEffect(() => {
    let currentText = textSteps[textIndex];
    let charIndex = 0;
    setText(""); // Reinicia el texto antes de escribirlo

    const typeInterval = setInterval(() => {
      if (charIndex < currentText.length) {
        setText((prev) => prev + currentText[charIndex]);
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50); // Velocidad de escritura

    return () => clearInterval(typeInterval);
  }, [textIndex]);

  return (
    <div className="tutorial-container assign-section">
      {/* Sección de video */}
      <div className="tutorial-video">
        <video id="tutorial-video" controls>
          <source src="/assets/media/video/video_prueba.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Sección de texto con efecto mecanografía */}
      <div className="tutorial-text">
        <p className="typing">{text}</p>
      </div>
    </div>
  );
};

export default Tutorial;
