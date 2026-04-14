import React from 'react';
import SimpleAuth from '../components/SimpleAuth';

const AuthenticationPage = ({ mode, role }) => {
  return <SimpleAuth mode={mode} role={role} />;
};

export default AuthenticationPage;
