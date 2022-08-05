import { useState, useEffect } from 'react'
import Formulario from './components/formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'

// -----------------------ESTILOS-------------------------------

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin :100px auto 0 auto;
  display: block;
`
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

// -----------------------React-------------------------------
function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
      if (Object.keys(monedas).length > 0) {

          const cotizarCrypto = async() => {
              setCargando(true)
              setResultado({})

              const {moneda, cryptomoneda} = monedas
              const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`

              const rta = await fetch(url)
              const resultado = await rta.json()

              // Los corchetes en este caso hace que busque una propiedad en ese objeto que tenga el nombre de la cryptomoneda
              setResultado(resultado.DISPLAY[cryptomoneda][moneda]);
              setCargando(false)
          }
          cotizarCrypto()
      }
  }, [monedas])

  return (
      <Contenedor>

          <Imagen
              src={ImagenCripto}
              alt="imagenes cripto"
          />
          <div>
            <Heading>Cotiza Criptomonedas al Instante</Heading>
            <Formulario
                setMonedas = {setMonedas}
            />
            { cargando && <Spinner/>}
            { resultado.PRICE && <Resultado resultado={resultado} monedas={monedas}/>}
          </div>

      </Contenedor>
  )
}

export default App