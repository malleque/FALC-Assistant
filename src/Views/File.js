import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React from "react";
import '../Css/File.css';
import {Link} from "react-router-dom";
import button from "react-bootstrap/Button";
var data ="Ouverts ou autorisés depuis le 6 juin\n" +
    "Assemblées de sociétés jusqu’à 300 personnes (délai pour la convocation d’assemblées écrites ou électroniques : 1er juillet)\n" +
    "Enseignement présentiel au secondaire II, dans les écoles professionnelles, les hautes écoles ainsi que dans les autres établissements de formation\n" +
    "Entraînement sportif avec contact physique, par exemple lutte, boxe, football américain ou rugby\n" +
    "Établissements tels que les casinos, centres de loisirs, parcs animaliers, jardins botaniques et zoologiques, centres de bien-être, piscines\n" +
    "Établissements de tourisme estival tels que les aires de campings, chemins de fer de montage, pistes de luge, parcs de VTT et parcs d’aventures\n" +
    "Établissements érotiques, services d’escort, prostitution\n" +
    "Centres de vacances pour enfants et adolescents avec au maximum 300 personnes\n" +
    "Compétitions sportifs jusqu’à 300 personnes (à condition de désigner une personne responsable de faire respecter le plan de protection)\n" +
    "Dans la restauration, activités comme le billard, les fléchettes, la musique en direct, à condition de :\n" +
    "Consommer assis (sauf discothèques, boîtes de nuit, locaux de danse)\n" +
    "Limiter les heures d’ouverture\n" +
    "Dans la restauration, groupes de plus de 4 personnes, à condition de :\n" +
    "Au moins une personne par groupe doit indiquer ses coordonnées\n" +
    "Consommer assis (sauf discothèques, boîtes de nuit, locaux de danse)\n" +
    "Limiter les heures d’ouverture\n" +
    "Manifestations jusqu’à 300 personnes\n" +
    "Manifestations politiques et sociales jusqu’à 300 personnes (à condition de désigner une personne responsable de faire respecter le plan de protection)\n" +
    "Enseignement présentiel au secondaire II, dans les écoles professionnelles, les hautes écoles ainsi que dans les autres établissements de formation\n" +
    "Entraînement sportif avec contact physique, par exemple lutte, boxe, football américain ou rugby";

    var data2 = "Restaurants et bar"+
        "Il est à nouveau possible de se réunir à plus de 4 personnes au restaurant ou dans un bar."+
        "Mais des règles strictes s’appliquent :"+
        "Une personne du groupe doit indiquer son nom et son adresse."+
        "Il faut s’asseoir à une table pour boire ou manger."+
        "Sauf dans les discothèques, les night-clubs et les salles de danse."+
        "On peut à nouveau jouer au billard ou aux fléchettes."+
        "Écouter de la musique live est à nouveau possible."+
        "Les horaires d’ouverture sont limités."+
        "Rassemblements et manifestations"+
        "Les réunions de plus de 5 personnes sont à nouveau possibles."+
        "Sont autorisés :"+
        "Les camps de vacances pour enfants et jeunes jusqu’à 300 participants au maximum"+
        "Les services religieux et fêtes religieuses"+
        "La récolte de signatures dans l’espace public"+<br/>+
        "Les manifestations politiques jusqu’à 300 personnes au maximum"+<br/>+
        "Mais il doit y avoir un plan de protection."+<br/>+
        "Une personne doit être responsable du plan de protection"+<br/>+
        "Les manifestations jusqu’à 300 personnes au maximum";


function File() {
    return (

        <div>
            <header>
                <h2> mon document</h2>
                    <button type="button"
                            className="btn btn-primary btn-lg" type="submit"
                    >Sauvegarder
                    </button>
            </header>
        <div class={"split left"}>
            <div class={"centered"}>
                <h3>Texte initial</h3>
            <CKEditor
                editor={ DecoupledEditor }
                onInit={ editor => {
                    console.log( 'Editor is ready to use!', editor );

                    // Insert the toolbar before the editable area.
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                } }
                onChange={ ( event, editor ) => console.log( { event, editor } ) }
                editor={ DecoupledEditor }
                data= {data}
                config={DecoupledEditor }
            />
            </div>
        </div>
        <div class={"split right"}>
            <div class={"centered"}>
                <h3>Texte traduit</h3>
                <CKEditor
                    editor={DecoupledEditor}
                    onInit={editor => {
                        console.log('Editor is ready to use!', editor);

                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );
                    }}
                    onChange={(event, editor) => console.log({event, editor})}
                    editor={DecoupledEditor}
                    data={data2}
                    config={DecoupledEditor}
                />
            </div>
        </div>
            <div class={"splitD"}>
                <h3> Améliorations possibles</h3>
            </div>
        </div>
    )
}

export default File;