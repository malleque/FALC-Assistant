import React from 'react';
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import button from "react-bootstrap/Button";
function Community() {
    return (
        <div>
        <h1>Community</h1>
        <Table responsive>
            <thead>
            <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Rôle</th>
                <th>Document</th>
                <th>Date</th>
                <th>Version</th>
                <th>Lien</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Praz</td>
                <td>Florent</td>
                <td>Testeur</td>
                <td>Document1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td><Link to={"/File"}>
                    <button type="button"
                            className="btn btn-primary btn-lg"
                    >Document
                    </button>
                </Link></td>

            </tr>
            <tr>
                <td>2</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>

            </tr>
            <tr>
                <td>3</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>

            </tr>
            </tbody>
        </Table>
        </div>
    );
}
export default Community