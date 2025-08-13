import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const Layout = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar 
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;