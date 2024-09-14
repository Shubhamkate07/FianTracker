import React from 'react';
import { Outlet } from 'react-router-dom';
import Body from '../Components/Body';

function Root() {
  return (
    <Body>
      <Outlet />
    </Body>
  );
}

export default Root;
