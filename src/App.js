import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Nav, Navbar, NavDropdown, Form, FormControl } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import FuncionariosList from "./components/funcionario-list-component";
import CriarFuncionario from "./components/funcionario-create-component";
import EditarFuncionario from "./components/funcionarios-edit-component";


import EstudanteList from "./components/estudante-list-component";
import EditarEstudante from "./components/estudante-edit-component";
import CriarEstudante from "./components/estudante-create-component";

import AgendamentoList from "./components/rv-list-component";
import EditarAgendamento from "./components/rv-edit-component";
import CriarAgendamento from "./components/rv-create-component";

import CriarAtendimento from "./components/atendimento-create-component";
import AtendimentoList from "./components/atendimento-list-component";
import EditarAtendimento from "./components/atendimento-edit-component";

import CriarLevantamento from "./components/levantamento-create-component";
import LevantamentoList from "./components/levantamento-list-component";
import EditarLevantamento from "./components/levantamento-edit-component";


function App() {
  return (
    <Router>
      <div className="container">

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img src="https://cdn0.iconfinder.com/data/icons/refugees-problem-1/512/as473_16-512.png" width="30" height="30" ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Funcionario" id="basic-nav-dropdown">
                <NavDropdown.Divider />
                <NavDropdown.Item href="/">Funcionarios</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/create_funcionario">Criar funcionario</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Estudante" id="basic-nav-dropdown">
                <NavDropdown.Divider />
                <NavDropdown.Item href="/estudante">Estudante</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/create_estuande">Criar Estudante</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Agendamento" id="basic-nav-dropdown">
                <NavDropdown.Divider />
                <NavDropdown.Item href="/renovacao_visto">Agendamento</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/create_renovacao_visto">Criar Agendamento</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Atendimento" id="basic-nav-dropdown">
                <NavDropdown.Divider />
                <NavDropdown.Item href="/atendimento">Atendimento</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/create_atendimento">Criar Atendimento</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Levantamento de Documento" id="basic-nav-dropdown">
                <NavDropdown.Divider />
                <NavDropdown.Item href="/levantamento">Levantamento de Documento</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/create_levantamento">Criar Levantamento de Doc.</NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Navbar>


        {/* Routa para FuncionariosList */}
        <Route path="/" exact component={FuncionariosList} />
        <Route path="/edit_funcionartio/:id" component={EditarFuncionario} />
        <Route path="/create_funcionario" component={CriarFuncionario} />

        {/* Routa para Estudante */}
        <Route path="/estudante" component={EstudanteList} />
        <Route path="/edit_estuande/:id" component={EditarEstudante} />
        <Route path="/create_estuande" component={CriarEstudante} />

        {/* Renovacao do visto  */}
        <Route path="/renovacao_visto" component={AgendamentoList} />
        <Route path="/edit_renovacao_visto/:id" component={EditarAgendamento} />
        <Route path="/create_renovacao_visto" component={CriarAgendamento} />


        {/* Routa para Atendimento */}
        <Route path="/create_atendimento" component={CriarAtendimento} />
        <Route path="/edit_atendimento/:id" component={EditarAtendimento} />
        <Route path="/atendimento" component={AtendimentoList} />

        {/* Levantamneto de RNE */}
        <Route path="/levantamento" component={LevantamentoList} />
        <Route path="/edit_levantamento/:id" component={EditarLevantamento} />
        <Route path="/create_levantamento" component={CriarLevantamento} />

      </div>

    </Router>
  );
}

export default App;
