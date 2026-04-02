import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  HouseIcon,
  UserPlusIcon,
  ThreadsLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
} from "@phosphor-icons/react";
import Home from "./routes/home";
import Update from "./routes/update";
import Create from "./routes/create";
import Button from "./components/Button";
import Link from "./components/Link";
import "./styles/global.css";

function Header() {
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate("/");
  };

  const handleCreatePage = () => {
    navigate("/create");
  };

  return (
    <section id="header">
      <div>
        <Button icon={HouseIcon} onClick={handleHomePage} />
      </div>
      <div>
        <Button icon={UserPlusIcon} text="Novo" onClick={handleCreatePage} />
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:user_id" element={<Update />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>

      <section id="foot">
        <div id="social">
          <ThreadsLogoIcon className="icon" />
          <h2>Socials</h2>
          <p>Follow me</p>
          <ul>
            <li>
              <Link
                ref="https://github.com/DJoverdant"
                icon={GithubLogoIcon}
                text="Github"
              />
            </li>
            <li>
              <Link
                ref="https://instagram.com/andre_19z"
                icon={InstagramLogoIcon}
                text="Instagram"
              />
            </li>
          </ul>
        </div>
      </section>

      <section id="spacer"></section>
    </BrowserRouter>
  );
}

export default App;
