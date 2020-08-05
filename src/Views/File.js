import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React,{Component} from "react";
import '../Css/Home.css';
import button from "react-bootstrap/Button";
import {Col, Container, Dropdown, DropdownButton, Row, Breadcrumb, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import firebase from 'firebase';
import moment from "moment";
var FileBefore=localStorage.getItem("documentVersion");
var dataTest="";
var files;
var count=1;
function findVersionNumber(arr){
    if(arr.length != 0) {
        console.log(arr);
        for (var i = 0; i <= arr.length-1; i++) {
            console.log(arr[i].title)
            if (arr[i].version.includes("travail")) {
                if (count <= arr[i].numberV)
                    count = arr[i].numberV + 1;
            }
        }

    }

}
function ConvertDivAttributes( editor ) {
    // Allow <div> elements in the model.
    editor.model.schema.register( 'div', {
        allowWhere: '$block',
        allowContentOf: '$root'
    } );

    // Allow <div> elements in the model to have all attributes.
    editor.model.schema.addAttributeCheck( context => {
        if ( context.endsWith( 'div' ) ) {
            return true;
        }
    } );

    // View-to-model converter converting a view <div> with all its attributes to the model.
    editor.conversion.for( 'upcast' ).elementToElement( {
        view: 'div',
        model: ( viewElement, modelWriter ) => {
            return modelWriter.createElement( 'div', viewElement.getAttributes() );
        }
    } );

    // Model-to-view converter for the <div> element (attributes are converted separately).
    editor.conversion.for( 'downcast' ).elementToElement( {
        model: 'div',
        view: 'div'
    } );

    // Model-to-view converter for <div> attributes.
    // Note that a lower-level, event-based API is used here.
    editor.conversion.for( 'downcast' ).add( dispatcher => {
        dispatcher.on( 'attribute', ( evt, data, conversionApi ) => {
            // Convert <div> attributes only.
            if ( data.item.name != 'div' ) {
                return;
            }

            const viewWriter = conversionApi.writer;
            const viewDiv = conversionApi.mapper.toViewElement( data.item );

            // In the model-to-view conversion we convert changes.
            // An attribute can be added or removed or changed.
            // The below code handles all 3 cases.
            if ( data.attributeNewValue ) {
                viewWriter.setAttribute( data.attributeKey, data.attributeNewValue, viewDiv );
            } else {
                viewWriter.removeAttribute( data.attributeKey, viewDiv );
            }
        } );
    } );
}
class File extends Component {
    constructor(props) {
        super(props);
        //For the dropdown button to close it when we click outside
        this.container = React.createRef();
        this.state = {
            arrFile: [],
            arrFileChoose: [],
            arrFileBefore: [],
            data: "",
            open: false,
            numberV: count,
            version: localStorage.getItem("documentVersion")
        }
        FileBefore = this.state.version;
        console.log(localStorage.getItem("documentTitle"));
        firebase.database().ref().child('files/'+localStorage.getItem("username")).on('value', data => {
            console.log(data.val());
            files = data.toJSON();
            const arrFile=[];
            Object.keys(files).forEach(function (item) {
                console.log(files[item]);
                if (files[item].title === localStorage.getItem("documentTitle")) arrFile.push(files[item]);
            });
            //if more than one version exist, we will take this choose before
            if(arrFile.length>1){
                var sorted_files = arrFile.sort((a,b) => {
                    return new Date(a.date).getTime() -
                        new Date(b.date).getTime()
                }).reverse();
                console.log(arrFile);
                this.setState({
                    arrFileChoose: arrFile,
                });
            }
            else
                this.setState ({
                    arrFileChoose: arrFile,
                });
        });
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };
    handleButtonClick = () => {
        this.setState(state => {
            return {
                open: !state.open,
            };
        });
    };
    handleData = e => {
        this.setState({
            data: dataTest
        })
    }
    handleFindErrors=e =>{
        dataTest = dataTest.replace('test', 'bite');
    }
    handleSubmit=e =>{
        firebase.database().ref('files/'+localStorage.getItem("username")).push(
            {
                title: localStorage.getItem("documentTitle"),
                version: "version de travail "+count,
                date : moment().format("DD-MM-YYYY hh:mm:ss"),
                data : this.state.data,
                numberV : count
            }
        );
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        this.setState({
            text: ""
        })
        FileBefore= "version de travail "+count;
        count ++;
    }

    render(){
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        var arrFileC=[];
        this.state.arrFileChoose.forEach(item=>{
            if(item.version === "texte initial"){
                arrFileC.push({...item})
            }
        });
        var versions=[];
        console.log(FileBefore)
        console.log(arrFileC);
        this.state.arrFileChoose.forEach(item=>{
            if(item.version === FileBefore.toString()){
                versions.push({...item})
            }
        });
        console.log(localStorage.getItem("documentVersion"));
        console.log(versions);
        console.log(arrFileC);
        console.log(FileBefore);
        findVersionNumber(this.state.arrFileChoose);
        DecoupledEditor
            .create( document.querySelector( '#editor' ), {
                extraPlugins: [ ConvertDivAttributes ],
            })
            .then( editor => {
                console.log( 'Editor was initialized', editor );

                // Append the toolbar to the <body> element.
                document.body.appendChild( editor.ui.view.toolbar.element );
            } )
            .catch( err => {
                console.error( err.stack );
            } );
        return (
            <div>
                {arrFileC.map(item => (
                    <td key={item.title}>
                        {versions.map(item2=>(
                            <td key={item2.title}>

                                            <div className="split left">
                                                <h1>{item.title}</h1>
                                            </div>

                                            <div className="split right">
                                                <button type="button" onClick={this.handleSubmit}
                                                        className="button" type="submit"
                                                >Sauvegarder
                                                </button>
                                            </div>
                                        <div id="breadcrumbNav2">
                                            <div id="arrowBar2">
                                                <a> <span className="AB2rotate color0"><span
                                                    className="AB2rotateReset"><span
                                                    className="AB2text0"><h1>Etapes:</h1></span></span></span></a>
                                                <a> <span className="AB2rotate active1"><span
                                                    className="AB2rotateReset"><span
                                                    className="AB2textActive">Transcription</span></span></span></a>
                                                <a href="/Layout"> <span className="AB2rotate color2 AB1rotate"><span
                                                    className="AB2rotateReset"><span
                                                    className="AB2text2">Mise en page</span></span></span></a>
                                                <a href="/FindPeople"> <span className="AB2rotate color3 AB1rotate"><span
                                                    className="AB2rotateReset"><span
                                                    className="AB2text3">Relecture</span></span></span></a>
                                            </div>
                                        </div>

                                            <div className="splitM right" ref={this.container}>
                                                <h3 type="button" className="buttonDropdown" onClick={this.handleButtonClick}>
                                                    {FileBefore} ☰
                                                </h3>
                                                <div className="dropdown">
                                                {this.state.arrFileChoose.map(item3=>
                                                        <ul key={item3.version}>
                                                            {this.state.open && (

                                                        <li className="liDropdown" onClick={() =>(FileBefore=item3.version, this.setState({version: item3.version}))}>{item3.version}</li>
                                                            )}
                                                    </ul>

                                                )}
                                                </div>
                                            </div>
                                             <h3 className="splitM left">{item.version}</h3>



                                       <div className="splitD left">
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
                                                data={item.data}
                                                config={DecoupledEditor}
                                            />
                                        </div>
                                        <div className="splitD right">
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
                                                onChange={(event, editor) => {
                                                    dataTest = editor.getData();
                                                    this.handleData();
                                                    this.handleFindErrors();
                                                    console.log({event, editor, dataTest});
                                                }}
                                                editor={DecoupledEditor}
                                                dataTest={item2.data}
                                                data={item2.data}
                                                config={DecoupledEditor}

                                            />
                                        </div>




                            </td>
                        ))}
                    </td>))}
            </div>


        );
    }

}
export default File;
