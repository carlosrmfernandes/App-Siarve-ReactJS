import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Atendimento = props => (
    <tr>
        <td><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB8X2a5vl8fEHpGd7db1GwfSW-WVMmuwb1RdHXxcBt3yOLVQksNA&s" width="30" height="30" ></img></td>
        <td>{props.atendimento.name}</td>        
        <td className="float-right">
            <Link to={"/edit_atendimento/" + props.atendimento._id}>
                <button type="button" className="btn btn-primary">Editar</button>
            </Link>
            <samp> </samp>
            <button onClick={() => deletar(props.atendimento._id)} type="button" className="btn btn-danger">Delete</button>
        </td>
    </tr>

)
let deletar = async (_id) => {
    var url = 'http://localhost:3030/apagar_atendimento/'+_id;
    await axios.delete(url).then(response => {
           
    }).catch(function (error) {
        console.log(error)
    })
     window.location.reload();
}
export default class AtendimentoList extends Component {

    constructor(props) {
        super(props);
        this.state = { atendimento: [] };
    }

    async  componentDidMount() {
        await axios.get('http://localhost:3030/atendimento_all').then(response => {
            this.setState({ atendimento: response.data.data });
        }).catch(function (error) {
            console.log(error);
        })
    }

    atendimentoList() {
        return this.state.atendimento.map(function (params, i) {
            return <Atendimento atendimento={params} key={i} />;
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
                            <th className="float-right">Acao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.atendimentoList()}
                    </tbody>
                </table>
            </div>
        );
    }
}