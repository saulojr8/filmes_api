
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css';
import api from '../../services/api';
import { toast } from "react-toastify";

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [filme, setFIlme] = useState();
    const [loading, setLoading] = useState(true);

    useEffect (()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "7092f2e6ee4bbd1fe899d1c41dda5b5f",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFIlme(response.data);
                setLoading(false);
            })
            //se o filme não for encontrado, caso seja digitado algum url, o usuário será redirecionado para a tela home
            .catch(()=>{
                console.log("Filme não encontrado!")
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO!")
        }

    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix") //@primeflix é a chave que criamos para o localstorage
        
        //verifica se existe a lista salvo, caso contrario ele cria uma nova, por isso o []
        //JSON.parse converte a lista para String
        let filmesSalvos = JSON.parse(minhaLista) || [];

        //verifica se dentro da lista do local storage ja existe um item igual, ou seja, se o filme ja foi salvo antes
        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id); 

        if(hasFilme){
            toast.warn("Esse filme já esta na sua lista!")
            return;
        }

        //SALVA O FILME NA LISTA
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average}</strong>

            <div className="area-buttons">
                
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;