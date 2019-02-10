import React from 'react'

const Login = ({ authenticate }) => {
    return (
        <div className="login">
            <h2>Connectez-vous pour créer vos recettes !</h2>
            <button className="facebook-button" onClick={authenticate}>Me connecter avec facebook</button>
        </div>
    )
}

export default Login