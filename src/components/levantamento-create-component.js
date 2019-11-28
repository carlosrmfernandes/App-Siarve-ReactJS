import React, { Component, useMemo } from 'react';
import axios from 'axios';
import './style.css'
export default class CriarLevantamento extends Component {


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeRne = this.onChangeRne.bind(this);        
        this.onChangeDataLevantamento = this.onChangeDataLevantamento.bind(this);

        this.state = {
            name: '',            
            data_levantamento: '',
        }


    }
    async onSubmit(e) {
        e.preventDefault();
        var ok = false; 
        await axios.post('http://localhost:3030/levantar_doc',
            {
                'rne': this.state.rne,                
                'data_levantamento': this.state.data_levantamento,
                
            },{
                headers:{
                    'funcionario_id': "5da52f9566902ed1e73d218f",
                }
            }            
        ).then(res => {
            alert("Sucesso!..");
            ok = true;

        }).catch(function (error) {
            alert(error.response.data.message)
            ok = false;
        })

        if (ok) {
            this.setState({
                rne: '',                
                data_levantamento: '',
            })
        }       

    }
    onChangeRne(e) { this.setState({ rne: e.target.value }) }
    onChangeDataLevantamento(e) { this.setState({ data_levantamento: e.target.value }) }    
    
    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h5>Levantamento de Documento</h5>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">                        
                        <label>RNE : </label>
                        <input type="text" className="form-control" value={this.state.rne} required
                            onChange={this.onChangeRne}
                        />                        
                        <label>Data de Levantamento : </label>
                        <input type="date" className="form-control" value={this.state.data_levantamento} required
                            onChange={this.onChangeDataLevantamento}
                        />                       
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Salvar" className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        );
    }
}