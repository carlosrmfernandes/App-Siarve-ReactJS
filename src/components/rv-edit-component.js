import React, { Component, useMemo } from 'react';
import axios from 'axios';
export default class EditarAgendamento extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDataAgendamento = this.onChangeDataAgendamento.bind(this);
        this.state = {
            name: '',
            email: '',
            data_agendamento: '',
        }
    }
    async  componentDidMount() {
        await axios.get('http://localhost:3030/agendar/' + this.props.match.params.id).then(response => {

            this.setState({
                name: response.data.data[0].name,
                email: response.data.data[0].email,
                data_agendamento: response.data.data[0].data_agendamento,

            });
        }).catch(function (error) {
            console.log(error);
        })
    }
    async onSubmit(e) {
        e.preventDefault();
        var ok = false;
        await axios.put('http://localhost:3030/editar_agendar/'+ this.props.match.params.id,
            {
                'name': this.state.name,
                'email': this.state.email,
                'data_agendamento': this.state.data_agendamento,

            }, {
            headers: {
                'funcionario_id': "5da52f9566902ed1e73d218f",
            }
        }
        ).then(res => {
            alert("Sucesso!..");
            ok = true;
            window.location.href = "http://localhost:3000/renovacao_visto/";

        }).catch(function (error) {
            alert(error.response.data.message)
            ok = false;
        })

        if (ok) {
            this.setState({
                name: '',
                email: '',
                data_agendamento: '',
            })
        }
    }
    onChangeName(e) { this.setState({ name: e.target.value }) }
    onChangeEmail(e) { this.setState({ email: e.target.value }) }
    onChangeDataAgendamento(e) { this.setState({ data_agendamento: e.target.value }) }
    render() {
        return (
            <div>
                <h5>Atualizar agendamento</h5>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Nome : </label>
                        <input type="text" className="form-control" value={this.state.name} required
                            onChange={this.onChangeName}
                        />
                        <label>Email : </label>
                        <input type="email" className="form-control" value={this.state.email} required
                            onChange={this.onChangeEmail}
                        />
                        <label>Data de Agendamento : </label>
                        <input type="date" className="form-control" value={this.state.data_agendamento} required
                            onChange={this.onChangeDataAgendamento}
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