import React from 'react';
import Nav from './components/Nav';
import Menu from './components/Menu';
import Footer from './components/Footer';

export default function Works() {
  return (
    <>
      <Nav />
      <Menu />
      <div className="page-wrapper">
        <div data-taxi="" className="main-wrapper">
          <div data-taxi-view="" className="page_view">
            <section className="section works">
              <div className="container works">
                <div className="space-150"></div>
                <h1 className="h1-home">Works Page Coming Soon</h1>
              </div>
            </section>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
