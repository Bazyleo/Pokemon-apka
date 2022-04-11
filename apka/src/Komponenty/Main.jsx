import React, { useEffect, useState } from "react";
import Karta from "./Karta";
import InfoPokemon from "./InfoPokemon";
import axios from "axios";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";


const Main=()=>{
const[url, setUrl]=useState("https://pokeapi.co/api/v2/pokemon/");
const[pokeData, setPokeData]=useState([]);
const[loading, setLoading]=useState(true);
const[pokeDex, setPokeDex]=useState();
const[nextUrl, setNextUrl]=useState();
const[prevUrl, setPrevUrl]=useState();



const pokemonF=async()=>{
    setLoading(true)
        const res=await axios.get(url);   


    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results)
    setLoading(false)
}

const getPokemon=async(res)=>{
res.map(async(item)=>{
    const result = await axios.get(item.url);
    setPokeData(state=>{
        state=[...state,  result.data]
        state.sort((a,b)=>a.id>b.id?1:-1)
        return state;
    })})
}

useEffect(()=>{
    pokemonF();} ,[url])
    
    return(
        <>
        <div className="kontener">
            <div className="lewastrona">
         <Karta pokemon={pokeData} loading={loading} InfoPokemon={poke=>setPokeDex(poke)} />
         
            <div className="buttons">
           {prevUrl && <button onClick={()=>{
            setPokeData([]);
            setUrl(prevUrl)}}> Previous page</button>}


            { nextUrl &&  <button onClick={()=>
                {
                 setPokeData([])
                setUrl(nextUrl)}}> Next page</button>}

            </div>
            </div>


            <div className="prawastrona">
            <InfoPokemon data={pokeDex}/>
            </div>
        </div>
        </>
    )
}
export default Main;