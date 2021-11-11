import React, {Component} from 'react';
import './App.css';


class App extends Component {

  render() {
    return <div className="app-container">
      <h1>Agenda React</h1>
      <LoginForm/>
      <Contacts/>
    </div>
  }
  
}


class Contacts extends Component {
  componentDidMount() {
    var divContact = document.getElementById('divContact');
    fetch('http://www.raydelto.org/agenda.php')
    .then(function (data) {
      return data.json();
    })
    .then(function (contactsList) {
      for (var i = 0; i < contactsList.length; i++) {
        var contact = contactsList[i];
        let contactListItem = document.createElement('p');
        
        let nombre = contact?.nombre;
        let apellido = contact?.apellido;
        let telefono = contact?.telefono;
        
        contactListItem.textContent = i+1+'- '+nombre+' '+apellido+' --- Tel: '+telefono;
        divContact.appendChild(contactListItem);
        
      }
    });
  }
  render() {
    return <div id="divContact" className="secondary-container">
      <h2>Contactos</h2>
    </div>;
  }
}

function saveContact() {
  let nombre = document.getElementById('nombre').value;
  let apellido = document.getElementById('apellido').value;
  let telefono = document.getElementById('telefono').value;
  const newContact = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
  };

  fetch('http://www.raydelto.org/agenda.php', {
      method: 'POST',
      body: JSON.stringify(newContact),
  }).then(res=> res.json()).then(data=> console.log(data));
  
}

class LoginForm extends Component {

  render() {
    return <div id="form-container" className="secondary-container">
      <h2>Agregar Contacto</h2>
      <form action="">
      <input className="text-field" type="text" id="nombre" name="nombre" placeholder="Nombre"/>
      <input className="text-field" type="text" id="apellido" name="apellido" placeholder="Apellido"/>
      <input className="text-field" type="text" id="telefono" name="telefono" placeholder="Número de teléfono"/>
      <button type="button" id="button" onClick={saveContact}>Guardar Contacto</button>
      </form>
      
    </div>
  }
}

export default App;
