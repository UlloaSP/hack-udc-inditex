const Tutorial = () => {
  return (
    <div className="tutorial-container assign-section">
      <div className="tutorial-video">
        <video id="tutorial-video" autoPlay loop muted>
          <source src="/assets/media/video/video_prueba.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="tutorial-text">
        <h2>
          Encuentra los artículos que buscas en un clic o con una simple foto.
          Nuestro buscador te ayudará a descubrir las mejores opciones para que
          siempre estés a la última. Escribe una breve descripción del producto
          que tienes en mente y te mostraremos artículos similares disponibles
          en nuestras tiendas. ¿Prefieres una búsqueda más visual? Sube una
          imagen y deja que nuestro sistema encuentre lo que buscas al instante.
        </h2>
      </div>
    </div>
  );
};

export default Tutorial;
