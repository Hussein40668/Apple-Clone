// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./components/Footer/custom.js";

import Main from "./Pages/Main/Main.jsx";
import Mac from "./Pages/Mac/Mac.jsx";
import Iphone from "./Pages/Iphone/Iphone.jsx";
import Ipad from "./Pages/Ipad/Ipad.jsx";
import Watch from "./Pages/Watch/Watch.jsx";
import TV from "./Pages/TV/TV.jsx";
import Music from "./Pages/Music/Music.jsx";
import Support from "./Pages/Support/Support.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Search from "./Pages/Search/Search.jsx";
import SharedLayout from "./components/SharedLayout/SharedLayout.jsx";
import SingleAppleProduct from "./Pages/SingleAppleProduct/SingleAppleProduct.jsx"
import Four04 from "./Pages/Four04/Four04.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/mac" element={<Mac />} />
        <Route path="/iphone" element={<Iphone />} />
        <Route path="/iphone/:productID" element={<SingleAppleProduct />} />
        <Route path="/ipad" element={<Ipad />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/music" element={<Music />} />
        <Route path="/support" element={<Support />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Four04 />} />
      </Route>
    </Routes>
  );
}

export default App;
