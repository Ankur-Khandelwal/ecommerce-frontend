import React from 'react';
import Layout from '../../components/Layout';
import './style.css';

function Home() {
  return (
    <div>
      <Layout sidebar>
        <h1 className="text-center">Welcome to Admin Dashboard</h1>
      </Layout>
    </div>
  );
}

export default Home;
