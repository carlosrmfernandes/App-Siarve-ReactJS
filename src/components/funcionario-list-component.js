import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Funcionario = props => (
    <tr>
        
        <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB8X2a5vl8fEHpGd7db1GwfSW-WVMmuwb1RdHXxcBt3yOLVQksNA&s" width="30" height="30" ></img></td>
        <td>{props.funcionario.name}</td>
        <td>{props.funcionario.email}</td>
        <td>{props.funcionario.funcao}</td>
        <td>{props.funcionario.sector}</td>
        <td>
            <Link to={"/edit_funcionartio/" + props.funcionario._id}>
                <button type="button" className="btn btn-primary">Editar</button>
            </Link>
            <samp> </samp>
            <button onClick={() => deletar(props.funcionario._id)} type="button" className="btn btn-danger">Delete</button>
        </td>
    </tr>

)
let deletar = async (_id) => {
    var url = 'http://localhost:3030/apagar_funcionario/'+_id;
    await axios.delete(url).then(response => {
           
    }).catch(function (error) {
        console.log(error)
    })
    window.location.reload();
}
export default class FuncionariosList extends Component {

    constructor(props) {
        super(props);
        this.state = { funcionarios: [] };
    }

    async  componentDidMount() {
        await axios.get('http://localhost:3030/funcionario_all').then(response => {
            this.setState({ funcionarios: response.data.data });
        }).catch(function (error) {
            console.log(error);
        })
    }

    funcionariosList() {
        return this.state.funcionarios.map(function (params, i) {
            return <Funcionario funcionario={params} key={i} />;
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
                            <th>Funcao</th>
                            <th>Setor</th>
                            <th>Acao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.funcionariosList()}
                    </tbody>
                </table>
            </div>
        );
    }
}