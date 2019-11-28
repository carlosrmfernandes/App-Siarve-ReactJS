import React, { Component, useMemo } from 'react';
import axios from 'axios';
export default class EditarAtendimento extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDoc = this.onChangeDoc.bind(this);
        this.onChangeName = this.onChangeName.bind(this);

        this.state = {
            doc: null,
            name: '',
        }


    }
    async  componentDidMount() {    
        await axios.get('http://localhost:3030/atendimento/' + this.props.match.params.id).then(response => {           
            this.setState({
                img: response.data.data[0].doc,
                name: response.data.data[0].name,                                
            });
        }).catch(function (error) {
            console.log(error);
        })
    }
    async onSubmit(e) {
        e.preventDefault();
        var ok =false;
        if (this.state.img) {
            // console.log(this.state.entry_date.toString());
            const data = new FormData();
            data.append('doc', this.state.doc);
            data.append('name', this.state.name);
            await axios.put('http://localhost:3030/editar_atendimento/'+this.props.match.params.id, data).then(res => {
               alert("Sucesso!..");
               ok=true;
               window.location.href = "http://localhost:3000/atendimento/";
            }).catch(function (error) {
                ok =false;
            })
            if(ok){
                this.setState({
                    doc: null,
                    name: '',
                })
            }
            
        } else {
            alert("Selecione uma Documento");
        }

    }
    onChangeDoc(e) { this.setState({ doc: e.target.files[0] }) }
    onChangeName(e) { this.setState({ name: e.target.value }) }
    
    render() {
        return (
            <div>
                <h5>Atualizar atendimento</h5>
                <form onSubmit={this.onSubmit}>

                <div className="form-group">
                        <label id="img">
                            <input type="file" onChange={this.onChangeDoc} style={{ background: `url(${this.preview})` }}
                            />
                        </label>
                        <label>Nome : </label>
                        <input type="text" className="form-control" value={this.state.name} required
                            onChange={this.onChangeName}
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