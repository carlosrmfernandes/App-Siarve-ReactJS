import React, { Component, useMemo } from 'react';
import axios from 'axios';
export default class EditarEstudante extends Component {
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
    async  componentDidMount() {    
        await axios.get('http://localhost:3030/estudante/' + this.props.match.params.id).then(response => {
            var entry_date = response.data.data[0].entry_date.split("T");
            this.setState({
                img: response.data.data[0].img,
                name: response.data.data[0].name,
                email: response.data.data[0].email,
                university: response.data.data[0].university,
                entry_date: entry_date[0],
                
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
            data.append('img', this.state.img);
            data.append('name', this.state.name);
            data.append('email', this.state.email);
            data.append('university', this.state.university);
            data.append('entry_date', this.state.entry_date);
            await axios.put('http://localhost:3030/editar_estudante/'+this.props.match.params.id, data).then(res => {
               alert("Sucesso!..");
               ok=true;
               window.location.href = "http://localhost:3000/estudante/";
            }).catch(function (error) {
                ok =false;
            })
            if(ok){
                this.setState({
                    img: null,
                    name: '',
                    email: '',
                    entry_date: '',
                    university: '',
                })
            }
            
        } else {
            alert("Selecione uma Documento");
        }

    }
    onChangeImg(e) { this.setState({ img: e.target.files[0] }) }
    onChangeName(e) { this.setState({ name: e.target.value }) }
    onChangeEmail(e) { this.setState({ email: e.target.value }) }
    onChangeUniversity(e) { this.setState({ university : e.target.value }) }
    onChangeEntryDate(e) { this.setState({ entry_date: e.target.value }) }
    render() {
        return (
            <div>
                <h5>Atualizar estudante</h5>
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