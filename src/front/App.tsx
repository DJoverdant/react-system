import Table from "./components/Table";
import Button from "./components/Button";
import Link from "./components/Link";
import "./styles/global.css";

function App() {
  return (
    <>
      <section id="header">
        <div></div>
      </section>

      <section id="canva">
        <Table />
      </section>

      <section id="foot">
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/src/front/assets/icons.svg#user"></use>
          </svg>
          <h2>Socials</h2>
          <p>Follow me</p>
          <ul>
            <li>
              <Link
                ref="https://github.com/DJoverdant"
                icon="/src/front/assets/icons.svg#github"
                text="Github"
              />
            </li>
            <li>
              <Link
                ref="https://instagram.com/andre_19z"
                icon="/src/front/assets/icons.svg#instagram"
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
