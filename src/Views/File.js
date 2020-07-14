import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React from "react";
import '../Css/File.css';




function File() {
    return (

        <div>
            <header>
                <h2> mon document</h2>
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
                data="<p>Hello from CKEditor 5's DecoupledEditor!</p>"
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
                    data="<p>Hello from CKEditor 5's DecoupledEditor!</p>"
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