import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Movies from "./page/Movies";
import MoviesDetail from "./page/MoviesDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./component/Navigation";
import "./App.css";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MoviesDetail />} />
      </Routes>
    </div>
  );
}

export default App;
