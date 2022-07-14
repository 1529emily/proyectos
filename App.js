import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Button,Container,Modal, ModalHeader,ModalBody,FormGroup,ModalFooter,} from "reactstrap";

const data = [
  { id: 1, nombre: "emily", telefono: 3204202734,fecha_nacimiento:"14-02-1999",direccion:"call 143#19a-23",correo:"emily@gmail.com" },
  { id: 2, nombre: "mauricio", telefono: 444-333-333,fecha_nacimiento:"16-02-1999",direccion:"call 143#19a-23",correo:"mauricio@gmail.com"},
  { id: 3, nombre: "aaron", telefono: 555-333-333,fecha_nacimiento:"13-02-1999",direccion:"call 143#19a-23",correo:"aaron@gmail.com" },
  { id: 4, nombre: "dianora", telefono: 666-333-333,fecha_nacimiento:"15-02-1999",direccion:"call 143#19a-23",correo:"dianora@gmail.com"},
  { id: 5, nombre: "ender", telefono: 777-333-333,fecha_nacimiento:"29-02-1999",direccion:"call 143#19a-23",correo:"ender@gmail.com"}
  
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      telefono: "",
      fecha_nacimiento: "",
      direccion: "",
      correo: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].telefono = dato.telefono;
        arreglo[contador].fecha_nacimiento = dato.fecha_nacimiento;
        arreglo[contador].direccion = dato.direccion;
        arreglo[contador].correo = dato.correo;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("esta seguro que quiere eliminar los datos de esta persona "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
    
  }
  

  

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>insertar personas</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>nombre</th>
                <th>telefono</th>
                <th>fecha_nacimiento</th>
                <th>direccion</th>
                <th>correo</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.telefono}</td>
                  <td>{dato.fecha_nacimiento}</td>
                  <td>{dato.direccion}</td>
                  <td>{dato.correo}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>actualizar</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                telefono: 
              </label>
              <input
                className="form-control"
                readOnly
                name="telefono"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.telefono}
              />
            </FormGroup>

            <FormGroup>
              <label>
                fecha_nacimiento: 
              </label>
              <input
                className="form-control"
                name="fecha_nacimiento"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fecha_nacimiento}
              />
            </FormGroup>
            <FormGroup>
              <label>
                direccion: 
              </label>
              <input
                className="form-control"
                name="direccion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.direccion}
              />
            </FormGroup>
            <FormGroup>
              <label>
                correo: 
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.correo}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar persona</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                telefono: 
              </label>
              <input
                className="form-control"
                readOnly
                name="telefono"
                type="text"
                value={this.state.form.telefono}
              />
            </FormGroup>
            <FormGroup>
              <label>
                fecha_nacimiento: 
              </label>
              <input
                className="form-control"
                name="fecha_nacimiento"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                direccion: 
              </label>
              <input
                className="form-control"
                name="direccion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                correo: 
              </label>
              <input
                className="form-control"
                name="correo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;




















//import logo from './logo.svg';
//import './App.css';

//function App() {
  //return (
    //<div className="App">
      //<header className="App-header">
       // <img src={logo} className="App-logo" alt="logo" />
       //// <p>
         // Edit <code>src/App.js</code> and save to reload.
        //</p>
        //<a
         // className="App-link"
          //href="https://reactjs.org"
          //target="_blank"
          //rel="noopener noreferrer"
       // >
         // Learn React
        //</a>
     // </header>
    //</div>
  //);
//}

//export default App;
