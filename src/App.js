import React, { Component, Fragment } from 'react'
import './App.css'
import Header from './components/Header'
import recettes from './recettes'
import Admin from './components/Admin'
import Card from './components/Card'
import home_logo from './components/logo/home.png'
import CookieAlert from './Cookie-Alert'

// Firebase
import base from './conf-firebase'

class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: {}
  }

  componentDidMount () {
    this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
      context: this,
      state: 'recettes'
    })
  }

  componentWillUnmount () {
    base.removeBinding(this.ref)
  }

  ajouterRecette = recette => {
    const recettes = { ...this.state.recettes }
    recettes[`recette-${Date.now()}`] = recette
    this.setState({ recettes })
  }

  majRecette = (key, newRecette) => {
    const recettes = { ...this.state.recettes }
    recettes[key] = newRecette
    this.setState({ recettes })
  }

  supprimerRecette = key => {
    const recettes = { ...this.state.recettes }
    recettes[key] = null
    this.setState({ recettes })
  }

  chargerExemple = () => this.setState({ recettes })

  render () {

    const cards = Object.keys(this.state.recettes)
    .map(key => <Card key={key} details={this.state.recettes[key]}/>)

    return (
      <Fragment>
        <CookieAlert/>
        <div className='box'>
          <a className="home-button" href="/"><img src={home_logo} alt="home-button"/></a>
          <Header pseudo={this.state.pseudo}></Header>
          <div className='cards'>
            {cards}
          </div>
          <Admin
            pseudo={this.state.pseudo}
            recettes={this.state.recettes} 
            ajouterRecette={this.ajouterRecette}
            majRecette={this.majRecette}
            supprimerRecette={this.supprimerRecette}
            chargerExemple={this.chargerExemple}/>
          <a className='report-problem' target="blank" href="https://github.com/yoanndelattre/Recipe-Box/issues">Report a Problem</a>
        </div>
      </Fragment>
    )
  }
}

export default App
