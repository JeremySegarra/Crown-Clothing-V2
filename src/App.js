import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";
import Authentication from "./routes/authentication/Authentication";

const Shop = () => {
  return <h1>Im the shop</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="auth" element={<Authentication />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
