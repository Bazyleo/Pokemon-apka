import React from "react";

const Karta=({pokemon, loading, InfoPokemon})=>{
    console.log(pokemon)
    return (

 <>
 {
     loading ? <h1> Loading! </h1>:
     pokemon.map((item)=>{
         return(
             <>
<div className="karta" key={item.id} onClick={()=>InfoPokemon(item)}>
        <h2>{item.id}</h2>
        <img src={item.sprites.front_default} alt=""/>
        <h2> {item.name}</h2>
    </div>

             </>
         )
     })
 }
    
 
 </>

    )
}

export default Karta;


