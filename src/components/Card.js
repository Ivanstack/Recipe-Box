import React from 'react'

const Card = ({ details }) => {

    const ingredients = details.ingredients
        .split(',')
        .map(item => <li key={item}>{item}</li>)

    const instructions = details.instructions
        .split('\n')
        .map(item => <li key={item}>{item}</li>)

    return (
        <div className="card">
            <div className="image">
                <img src={(details.image)} alt={details.nom} onError={(e) => {e.target.src = 'https://firebasestorage.googleapis.com/v0/b/recipe-box-236817.appspot.com/o/default.jpeg?alt=media&token=73d7df86-852a-4436-a89a-b09d78673db1'}} />
            </div>
            <div className="recette">
                <h2>{details.nom}</h2>
                <ul className="liste-ingredients">
                    {ingredients}
                </ul>
                <ol className="liste-instructions">
                    {instructions}
                </ol>
            </div>
        </div>
    )
}

export default Card