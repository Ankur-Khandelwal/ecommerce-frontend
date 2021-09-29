import React from 'react'
import Header from '../Header/index';
import {Container, Row, Col} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './styles.css';

function Layout(props) {
  return (
    <div>
      <Header/>
      {
        props.sidebar ? 
        <Container fluid>
          <Row>

            <Col xs={3} md={2} className="sidebar">
            <ul>
              <li><NavLink exact to={'/'}>Home</NavLink></li>
              <li><NavLink to={'/category'}>Categories</NavLink></li>
              <li><NavLink to={'/products'}>Products</NavLink></li>
              <li><NavLink to={'/orders'}>Orders</NavLink></li>
            </ul>
            </Col>
            
            <Col xs={9} md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }}>
            {props.children}
            </Col>
          </Row>
        </Container>
        : 
        props.children
      }
      
    </div>
  )
}

export default Layout;
