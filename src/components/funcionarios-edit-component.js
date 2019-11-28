import React, { Component, useMemo } from 'react';
import axios from 'axios';
export default class EditarFuncionario extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFuncao = this.onChangeFuncao.bind(this);
        this.onChangeSetor = this.onChangeSetor.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            img: null,
            name: '',
            email: '',
            funcao: '',
            setor: '',
            senha: ''
        }
    }
    async  componentDidMount() {
        await axios.get('http://localhost:3030/funcionario/' + this.props.match.params.id).then(response => {
      
            this.setState({
                img: response.data.data[0].img,
                name: response.data.data[0].name,
                email: response.data.data[0].email,
                funcao: response.data.data[0].funcao,
                setor: response.data.data[0].sector,
                
            });
        }).catch(function (error) {
            console.log(error);
        })
    }
    async onSubmit(e) {
        e.preventDefault();
        var ok =false;
        if (this.state.img) {
            const data = new FormData();
            data.append('img', this.state.img);
            data.append('name', this.state.name);
            data.append('email', this.state.email);
            data.append('funcao', this.state.funcao);
            data.append('sector', this.state.setor);
            data.append('senha', this.state.senha);
            await axios.put('http://localhost:3030/editar_funcionario/'+this.props.match.params.id, data).then(res => {
               alert("Sucesso!..");
               ok=true;
               window.location.href = "http://localhost:3000/";
            }).catch(function (error) {
                ok =false;
            })
            if(ok){
                this.setState({
                    img: null,
                    name: '',
                    email: '',
                    funcao: '',
                    setor: '',
                    senha: ''
                })
            }
            
        } else {
            alert("Selecione uma imagem");
        }

    }
    onChangeImg(e) { this.setState({ img: e.target.files[0] }) }
    onChangeName(e) { this.setState({ name: e.target.value }) }
    onChangeEmail(e) { this.setState({ email: e.target.value }) }
    onChangeFuncao(e) { this.setState({ funcao: e.target.value }) }
    onChangeSetor(e) { this.setState({ setor: e.target.value }) }
    onChangePassword(e) { this.setState({ senha: e.target.value }) }
    render() {
        return (
            <div>
                <h5>Atualizar Funcionario</h5>
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
                        <label>Funcao : </label>
                        <input type="text" className="form-control" value={this.state.funcao} required
                            onChange={this.onChangeFuncao}
                        />
                        <label>Setor : </label>
                        <input type="text" className="form-control" value={this.state.setor} required
                            onChange={this.onChangeSetor}
                        />
                        <label>Senha : </label>
                        <input type="password" className="form-control" value={this.state.senha} required
                            onChange={this.onChangePassword}
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