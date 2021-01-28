import React from 'react';
import './Dropdown.css';

class Dropdown extends React.Component {
  render() {
    return (
      <select onChange={(ev) => this.props.filterBy(ev.target.value)} className="comboBox" name="breed" id="breed">
        {this.props.breedList.map((item,ind) => <option key={ind} value={item}>{item}</option> )}
      </select>
    );
  }
}

export default Dropdown;
