import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  UserPlusIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
} from "@phosphor-icons/react";
import Home from "./routes/home/user";
import Update from "./routes/update";
import Link from "./components/Link";
import "./styles/global.css";

function App() {
  return (
    <>
      <section id="header">
        <div></div>
      </section>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update/:user_id" element={<Update />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>

      <section id="foot">
        <div id="social">
          <UserPlusIcon className="icon" size={60} />
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
    </>
  );
}

export default App;
