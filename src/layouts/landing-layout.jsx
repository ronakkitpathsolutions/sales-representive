import React from 'react';
import { Outlet } from 'react-router';

const LandingLayout = () => {
  return (
    <div>
      LandingLayout <Outlet />
    </div>
  );
};

export default LandingLayout;
