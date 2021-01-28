import React from 'react';
import Dropdown from './Dropdown'
import './Header.css';
import AppLogo from '../Assets/AppLogo.png';

class Header extends React.Component {
  render() {
    return (
      <header>
        <img className="appLogo" src={AppLogo}></img>
        <Dropdown breedList={this.props.breedList} filterBy = {this.props.filterBy}/>
      </header>
    );
  }
}

export default Header;
