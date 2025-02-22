import { useEffect, useState } from "react";

const Tutorial = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    const video = document.getElementById("tutorial-video");
    if (!video) return;
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
        <h1>Encuentra los artículos que buscas en un clic o con una simple foto. Nuestro buscador te ayudará a descubrir las mejores opciones para que siempre estés a la última.
          Escribe una breve descripción del producto que tienes en mente y te mostraremos artículos similares disponibles en nuestras tiendas. ¿Prefieres una búsqueda más visual? Sube una imagen y deja que nuestro sistema encuentre lo que buscas al instante.
        </h1>
      </div>
    </div>
  );
};

export default Tutorial;
