import { useState } from 'react'
import './styles/global.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="header">
        <div>
          
        </div>
      </section>

      <section id="canva">
        <div>
          <h1>Bem vindo</h1>
          <p>
            Inserir <code>botao</code> pra ir a tela da tabela
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 2)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="foot">
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Socials</h2>
          <p>Follow me</p>
          <ul>
            <li>
              <a href="https://github.com/DJoverdant" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/src/front/assets/icons.svg#github"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://instagram.com/andre_19z" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/src/front/assets/icons.svg#instagram"></use>
                </svg>
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
