import React, { Component } from 'react'
import AjouterRecette from './AjouterRecette'
import AdminForm from './AdminForm'

// Auth
import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from '../conf-firebase'
import Login from './Login'

class Admin extends Component {

    state = {
        uid: null,
        chef: null
    }

    handleAuth = async authData => {
        const box = await base.fetch(this.props.pseudo, { context: this })
        
        if(!box.chef) {
            await base.post(`${this.props.pseudo}/chef`, {
                data: authData.user.uid
            })
        }

        this.setState ({
            uid: authData.user.uid,
            chef: box.chef || authData.user.uid
        })
    }

    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.handleAuth)
    }

    logout = async () => {
        await firebase.auth().signOut()
        this.setState({ uid: null })
    }

    render () {

        const { recettes, ajouterRecette, majRecette, chargerExemple, supprimerRecette } = this.props

        const logout = <button onClick={this.logout}>Déconnexion</button>

        // if user don't connect
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>
        }

        if (this.state.uid !== this.state.chef) {
            return (
                <div>
                    <div className="not-good-user-text">
                        <p>Vous n'êtes pas le chef de cette boite !</p>
                    </div>
                    <div className="not-good-user-logout">
                        {logout}
                    </div>
                </div>
            )
        }

        return (
            <div className="cards">
                <AjouterRecette ajouterRecette={ajouterRecette}/>
                {
                    Object.keys(recettes)
                        .map(key => <AdminForm
                            key={key}
                            id={key}
                            majRecette={majRecette}
                            supprimerRecette={supprimerRecette}
                            recettes={recettes} />)
                }
                <footer>
                    {logout}
                    <button onClick={chargerExemple}>Ajouter les recettes par défault</button>
                </footer>
            </div>
        )
    }
}

export default Admin