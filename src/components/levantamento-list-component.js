import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Levantamento = props => (
    <tr>
        
        <td>{props.levantamento.rne}</td>        
        <td>{props.levantamento.data_levantamento}</td>
        <td className="float-right">
            <Link to={"/edit_levantamento/" + props.levantamento._id}>
                <button type="button" className="btn btn-primary">Editar</button>
            </Link>
            <samp> </samp>
            <button onClick={() => deletar(props.levantamento._id)} type="button" className="btn btn-danger">Delete</button>
        </td>
        {/* <td>{props.funcionario.setor}</td> */}
    </tr>

)
let deletar = async (_id) => {
    var url = 'http://localhost:3030/apagar_levantar_doc/'+_id;
    await axios.delete(url).then(response => {
           
    }).catch(function (error) {
        console.log(error)
    })
    window.location.reload();
}
export default class LevantamentoList extends Component {

    constructor(props) {
        super(props);
        this.state = { levantamento: [] };
    }

    async  componentDidMount() {
        await axios.get('http://localhost:3030/levantar_doc_all').then(response => {
            this.setState({ levantamento: response.data.data });
        }).catch(function (error) {
            console.log(error);
        })
    }

    levantamentoList() {
        return this.state.levantamento.map(function (params, i) {
            return <Levantamento levantamento={params} key={i} />;
        })

    }
    render() {
        return (
            <div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>RNE</th>                            
                            <th>Data de Lavantamento de documento</th>
                            <th className="float-right" >Acao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.levantamentoList()}
                    </tbody>
                </table>
            </div>
        );
    }
}