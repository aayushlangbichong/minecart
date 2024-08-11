import React from 'react';
import Header from './components/layout/header';
import ProductList from './components/product-list';
import Footer from './components/layout/footer';

function App() {
  return (
    <div className="App border bg-[red]">
      <Header />
      <main>
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
