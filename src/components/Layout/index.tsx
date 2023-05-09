import React from 'react';

interface IProps extends React.PropsWithChildren {
  dark?: boolean;
}

function Layout({ children, dark }: IProps) {
  return (
    <div
      className={`w-full min-h-screen bg-gradient-to-r ${
        dark ? 'bg-offBlack' : 'from-paperBlue to-paperRed'
      }`}
    >
      {children}
    </div>
  );
}

export default Layout;
