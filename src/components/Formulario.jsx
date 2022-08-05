import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
// import { crypto, monedas } from '../data/monedas'
import { monedas } from '../data/monedas'
import { useState, useEffect } from "react"
import Error from './Error'

// -----------------------ESTILOS-------------------------------

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`


// -----------------------React-------------------------------
const Formulario = ({setMonedas}) => {
    const [cryptos, setCryptos] = useState([]);
    const [error, setError] = useState(false);

    // No pq en el otro lado se llame state, se tiene que llamar del mismo nombre, lo digo por la palabra moneda
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)
    const [cryptomoneda, SelectCryptomoneda] = useSelectMonedas('Elige tu Crypto', cryptos)



    // Como agarrar una Api y filtrar para pasar solo la informacion que querramos
    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const rta = await fetch(url);
            const resultado = await rta.json();

            const arrayCryptos = resultado.Data.map( crypto => {

                const objeto = {
                    id: crypto.CoinInfo.Name,
                    nombre: crypto.CoinInfo.FullName
                }
                return objeto;
            })
        setCryptos(arrayCryptos)

        }
        consultarAPI()
    }, [])


    const handleSubmit = e => {
        e.preventDefault()

        if ([moneda, cryptomoneda].includes('')) {
            setError(true)
            // console.log('Error');
            return;
        }
        setError(false)
        setMonedas({
            moneda,
            cryptomoneda
        })
    }
  return (
    <>
        {error && <Error>Todos los campos son obligatorios</Error>}

        <form
                onSubmit={handleSubmit}
        >
            <SelectMonedas/>
            <SelectCryptomoneda/>
            

            <InputSubmit 
                type="submit"
                value="Cotizar" />
            
        </form>
    </>
  )
}

export default Formulario