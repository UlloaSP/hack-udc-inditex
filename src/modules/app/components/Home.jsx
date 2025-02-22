import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Carousel, UploadButton } from "../../common";
import { SearchBar } from "../../products";
import { findProducts } from "./../../products/actions";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  // Maneja el cambio en el input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Dispara la búsqueda con debounce (espera 500ms después de que el usuario deja de escribir)
  useEffect(() => {
    if (searchQuery.trim() === "") return; // Evita búsquedas vacías

    const timeoutId = setTimeout(() => {
      dispatch(findProducts({ query: searchQuery }));
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timeoutId); // Limpia el timeout si el usuario sigue escribiendo
  }, [searchQuery, dispatch]);

  // Enviar la búsqueda manualmente al hacer submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    dispatch(findProducts({ query: searchQuery })); // Ejecuta la búsqueda inmediatamente
  };

  return (
    <div className="home assign-section">
      <Carousel folderPath="/assets/media/img/slides" imageCount={3}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "4rem",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          <SearchBar
            placeholder="Search something..."
            value={searchQuery}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
          <div className="separator"></div>
          <UploadButton />
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
