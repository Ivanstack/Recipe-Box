import React from 'react'

// Logo
import facebook_logo from './logo/facebook.png'
import google_logo from './logo/google.png'
import twitter_logo from './logo/twitter.png'

const Login = ({ authenticate_facebook, authenticate_google, authenticate_twitter }) => {
    return (
        <div className="login">
            <h2>Connectez-vous pour créer vos recettes !</h2>
            <button className="google-button" onClick={authenticate_google}>Me connecter avec Google <img alt="google-logo" src={google_logo}/></button>
            <button className="twitter-button" onClick={authenticate_twitter}>Me connecter avec Twitter <img alt="twitter-logo" src={twitter_logo}/></button>
            <button className="facebook-button" onClick={authenticate_facebook}>Me connecter avec Facebook <img alt="facebook-logo" src={facebook_logo}/></button>
        </div>
    )
}

export default Login