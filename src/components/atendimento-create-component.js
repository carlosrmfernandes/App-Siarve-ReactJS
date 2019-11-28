import React, { Component, useMemo } from 'react';
import axios from 'axios';
import './style.css'
export default class CriarAtendimento extends Component {


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
    async onSubmit(e) {
        e.preventDefault();
        var ok = false;
        if (this.state.doc) {
            const data = new FormData();
            data.append('doc', this.state.doc);
            data.append('name', this.state.name);

            await axios.post('http://localhost:3030/atendimento', data,
                {
                    headers: {
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
                    doc: null,
                    name: '',
                })
            }

        } else {
            alert("Selecione os Documentos");
        }

    }

    onChangeDoc(e) { this.setState({ doc: e.target.files[0] }) }
    onChangeName(e) { this.setState({ name: e.target.value }) }
    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h5>Criar novo atendimento</h5>
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