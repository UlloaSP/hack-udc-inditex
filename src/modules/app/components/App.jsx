import { useSmoothScroll } from "../../common/index.js";
import Body from "./Body.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Tutorial from "./Tutorial.jsx";

const App = () => {
  useSmoothScroll();
  return (
    <div className="assign-correct">
      <Header />
      <Tutorial />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
