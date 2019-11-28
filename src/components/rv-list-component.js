import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Agendamento = props => (
    <tr>
        
        <td>{props.agendamento.name}</td>
        <td>{props.agendamento.email}</td>
        <td>{props.agendamento.data_agendamento}</td>
        <td>
            <Link to={"/edit_renovacao_visto/" + props.agendamento._id}>
                <button type="button" className="btn btn-primary">Editar</button>
            </Link>
            <samp> </samp>
            <button onClick={() => deletar(props.agendamento._id)} type="button" className="btn btn-danger">Delete</button>
        </td>
        {/* <td>{props.funcionario.setor}</td> */}
    </tr>

)
let deletar = async (_id) => {
    var url = 'http://localhost:3030/apagar_agendar/'+_id;
    await axios.delete(url).then(response => {
           
    }).catch(function (error) {
        console.log(error)
    })
    window.location.reload();
}
export default class AgendamentoList extends Component {

    constructor(props) {
        super(props);
        this.state = { agendamento: [] };
    }

    async  componentDidMount() {
        await axios.get('http://localhost:3030/agendar_all').then(response => {
            this.setState({ agendamento: response.data.data });
        }).catch(function (error) {
            console.log(error);
        })
    }

    agendamentoList() {
        return this.state.agendamento.map(function (params, i) {
            return <Agendamento agendamento={params} key={i} />;
        })

    }
    render() {
        return (
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Data de Agendamento</th>
                            <th>Acao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.agendamentoList()}
                    </tbody>
                </table>
            </div>
        );
    }
}