import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Estudante = props => (
    <tr>
        <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB8X2a5vl8fEHpGd7db1GwfSW-WVMmuwb1RdHXxcBt3yOLVQksNA&s" width="30" height="30" ></img></td>
        <td>{props.estudante.name}</td>
        <td>{props.estudante.email}</td>
        <td>{props.estudante.university}</td>
        <td>{props.estudante.entry_date.split("T")[0]}</td>
        <td>
            <Link to={"/edit_estuande/" + props.estudante._id}>
                <button type="button" className="btn btn-primary">Editar</button>
            </Link>
            <samp> </samp>
            <button onClick={() => deletar(props.estudante._id)} type="button" className="btn btn-danger">Delete</button>
        </td>
    </tr>

)
let deletar = async (_id) => {
    var url = 'http://localhost:3030/apagar_estudante/'+_id;
    await axios.delete(url).then(response => {
           
    }).catch(function (error) {
        console.log(error)
    })
     window.location.reload();
}
export default class EstudanteList extends Component {

    constructor(props) {
        super(props);
        this.state = { estudante: [] };
    }

    async  componentDidMount() {
        await axios.get('http://localhost:3030/estudante_all').then(response => {
            this.setState({ estudante: response.data.data });
        }).catch(function (error) {
            console.log(error);
        })
    }

    estudanteList() {
        return this.state.estudante.map(function (params, i) {
            return <Estudante estudante={params} key={i} />;
        })

    }
    render() {
        return (
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Universidade</th>
                            <th>Data de Entrada</th>
                            <th>Acao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.estudanteList()}
                    </tbody>
                </table>
            </div>
        );
    }
}