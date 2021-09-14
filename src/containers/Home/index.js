import React from 'react'
import Layout from '../../components/Layout';
import {Row, Col, Container} from 'react-bootstrap';
import './style.css';

function Home() {
  return (
    <div>
    <Layout>
    <Container fluid>
    <Row>
      <Col md={2} className="sidebar">Sidebar</Col>
      <Col md={10} style={{marginLeft: 'auto'}}>Container</Col>
    </Row>
    </Container>
    <h1 className='text-center'>Welcome to Admin Dashboard</h1>
    </Layout>
    </div>
  )
}

export default Home
