import React, { Component, useMemo } from 'react';
import axios from 'axios';
import './style.css'
export default class CriarFuncionario extends Component {


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeEntryDate = this.onChangeEntryDate.bind(this);
        this.onChangeUniversity = this.onChangeUniversity.bind(this);

        this.state = {
            img: null,
            name: '',
            email: '',
            entry_date: '',
            university: '',
        }


    }
    async onSubmit(e) {
        e.preventDefault();
        var ok = false;
        if (this.state.img) {
            const data = new FormData();
            data.append('img', this.state.img);
            data.append('name', this.state.name);
            data.append('email', this.state.email);
            data.append('entry_date', this.state.entry_date);
            data.append('university', this.state.university);

            await axios.post('http://localhost:3030/estudante', data).then(res => {
                alert("Sucesso!..");
                ok = true;
            }).catch(function (error) {
                alert(error.response.data.message)
                ok = false;
            })
            if (ok) {
                this.setState({
                    img: null,
                    name: '',
                    email: '',
                    entry_date: '',
                    university: '',
                })
            }

        } else {
            alert("Selecione os Documentos");
        }

    }

    onChangeImg(e) { this.setState({ img: e.target.files[0] }) }
    onChangeName(e) { this.setState({ name: e.target.value }) }
    onChangeEmail(e) { this.setState({ email: e.target.value }) }
    onChangeEntryDate(e) { this.setState({ entry_date: e.target.value }) }
    onChangeUniversity(e) { this.setState({ university: e.target.value }) }
    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h5>Criar novo estudante</h5>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label id="img">
                            <input type="file" onChange={this.onChangeImg} style={{ background: `url(${this.preview})` }}
                            />
                        </label>
                        <label>Nome : </label>
                        <input type="text" className="form-control" value={this.state.name} required
                            onChange={this.onChangeName}
                        />
                        <label>Email : </label>
                        <input type="email" className="form-control" value={this.state.email} required
                            onChange={this.onChangeEmail}
                        />
                        <label>Universidade : </label>
                        <input type="text" className="form-control" value={this.state.university} required
                            onChange={this.onChangeUniversity}
                        />
                        <label>Data de Entrada : </label>
                        <input type="date" className="form-control" value={this.state.entry_date} required
                            onChange={this.onChangeEntryDate}
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