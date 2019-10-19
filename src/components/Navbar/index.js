import React from 'react';
import { connect } from 'react-redux';
import {login, logout} from 'services/Auth/api';
import Base from './base';

const mapStateToProps = (state, ownProps) => 
      {
          return {
              token: state.auth.token,
              user: state.auth.user
          };
};

const _Navbar = ({token, user}) => (
    <Base
      token={token}
      user={user}
      onLogin={() => login("Tester", "testmdp4")}
      onLogout={() => logout()}
    />  
);

const Navbar = connect(
    mapStateToProps
)(_Navbar);

export default Navbar;
