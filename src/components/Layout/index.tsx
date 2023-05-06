import React from 'react';

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-paperBlue to-paperRed">
      {children}
    </div>
  );
}

export default Layout;
