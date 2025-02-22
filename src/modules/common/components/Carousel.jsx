import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";

const Carousel = ({ folderPath, imageCount, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const items = useMemo(
    () =>
      Array.from({ length: imageCount }, (_, i) => ({
        id: `slide-${i + 1}`,
        src: `${folderPath}/carousel-${i + 1}-blur.jpg`,
        alt: `Slide ${i + 1}`,
      })),
    [folderPath, imageCount]
  );

  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= items.length) {
          setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex(0);
          }, 0);
          return items.length;
        }
        return prevIndex + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [items]);

  return (
    <div
      className="text-center align-items-center"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${(items.length + 1) * 100}%`,
          height: "100%",
          display: "flex",
          transition: isTransitioning ? "transform 1s ease-in-out" : "none",
          transform: `translateX(-${
            currentIndex * (100 / (items.length + 1))
          }%)`,
        }}
      >
        {[...items, items[0]].map((item, index) => (
          <div
            key={item.id}
            style={{
              flex: `0 0 ${100 / (items.length + 1)}%`,
              backgroundImage: `url(${item.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          ></div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  folderPath: PropTypes.string.isRequired,
  imageCount: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default Carousel;
