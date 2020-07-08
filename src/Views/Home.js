import React from 'react';
import '../Css/Home.css';
import button from "react-bootstrap/Button";
import {Link} from "react-router-dom";


function Home(){
    return(
        <div className="Home">
                <h1 className="text">Accueil</h1>
                <Link to={"/"}>
                <button class="button"
                        type="button"
                        className="btn btn-primary btn-lg"
                >Modifier l'écriture</button>
            </Link>

            <body className="Home-body">

            <p>
                Le falc assistant est une aide pour l'écriture en falc. <br/>
                Vous trouverez sur ce site : <br/>
                1) une page avec vos différents documents<br/>
                2) une page de modification avec les erreurs des textes.<br/>
                3)une page communautaire pour la relecture
            </p>
            <br/>
            <br/>
            <p>
                Comment nous contacter ?<br/>
                027/000.00.00<br/>
                Rue de la plaine 2,<br/>
                3960 Sierre<br/>
                Exemple@falc-assistant.ch<br/>

            </p>
            </body>
        </div>
    );
}
export default Home