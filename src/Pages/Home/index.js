
// useeffect e usestate para carregar e amarzenar quando o usuario abrir o app
import { useEffect, useState } from "react";
import api from '../../services/api'
import { Link } from "react-router-dom";
import './home.css';

function Home(){
    const [filmes, setFilmes] = useState([]); //[] define como array
    const [loading, setLoading] = useState(true); //define como booleano começando como true

    useEffect(() =>{

        async function loadFilmes(){
            const response = await api.get("/movie/now_playing", {
                params:{
                    api_key: "7092f2e6ee4bbd1fe899d1c41dda5b5f",
                    language: "pt-BR",
                    page: 1,
                }
            });

            // console.log(response.data.results.slice(0,10)); //mostra somente 10 filmes do resultado

            //passa 20 filmes do resultado do array para o array setFilmes, pode ser alterado para uma quantidade menor que 20
            setFilmes(response.data.results.slice(0, 20))
            setLoading(false);
        }

        loadFilmes();

    }, [])

    //Deixa uma mensagem na tela caso o carregametno estiver lento
    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return(
        //filmes.map percorre todo o array filmes para capturar os dados, key foi passado no article pois necessita para identificar os filmes. as propriedades key, id e title fazem parte da api
        <div className="container">
            <div className="lista-filmes">
                {filmes.map ((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Home;