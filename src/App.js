import React, {Component}  from 'react';
import axios from 'axios';
import { Navbar, Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const API_PATH = 'http://localhost:80/anti-covid-react/api/contact/index.php';

class App extends Component  {
  constructor(props){
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      message: '',
      mailSent: false,
      error: null,
      curPatientName: '',
      curPatientEmail: ''
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: this.state
    })
      .then(result => {
        console.log(result);
        console.log(result.data);
        this.setState({
          mailSent: result.data.sent,
          curPatientEmail: result.data.curPatientEmail,
          curPatientName: result.data.curPatientName
        })
      })
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    return (
      <div className="App">

        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#">
            <p className="title">Anti-COVID  Hospital  Patient  Info  Console</p>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
        
        <Row>
          <div>&nbsp; </div>
        </Row>
        <Row>
          <div>&nbsp; </div>
        </Row>
        <Row>
          <div>&nbsp; </div>
        </Row>
        
        <Row>
          <Col lg={{offset: 2}}>
            <p className="title">Get the next petient: </p>
            <form action="#" >
              <Button size="lg" variant="success" type="submit" onClick={e => this.handleFormSubmit(e)}>Next Patient!</Button>{' '}
            </form >
          </Col>
        </Row>

        <Row>
          <div>&nbsp; </div>
        </Row>
        <Row>
          <div>&nbsp; </div>
        </Row>
        <Row>
          <div>&nbsp; </div>
        </Row>

        <Row>
          <Col lg={{offset: 2}}>
            <div>
              {this.state.mailSent &&
                <div>
                  <p className="title">The current petient name is: </p>
                  <p className="receive">{this.state.curPatientName}</p>
                  <div>&nbsp; </div>
                  <p className="title">The current petient email is: </p>
                  <p className="receive">{this.state.curPatientEmail}</p>
                </div>
              }
            </div>
          </Col>
        </Row>

        <Row>
          <div>&nbsp; </div>
        </Row>
        <Row>
          <div>&nbsp; </div>
        </Row>
        <Row>
          <div>&nbsp; </div>
        </Row>

        <Row>
          <Col lg={{offset: 2}}>
            <div>
              {this.state.mailSent &&
                <div><p className="receive">Already call the next patient! She/He will come in soon~</p></div>
              }
            </div>
          </Col>
        </Row>
        
      </div>
    );
  }
}

export default App;
