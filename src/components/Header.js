import React from "react";
import PropTypes from 'prop-types'

const Header = ({ title, buttonData }) => {
  const buttons = [];
  for (let data of buttonData) {
    buttons.push(<button onClick={data.onClick} style={{ backgroundColor: 'gray' }} className='btn'>
      {data.title}
    </button>);
  }

  return (
    <header className='header'>
      <h1>{title}</h1>
      <div>
        {buttons}
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  buttonData: PropTypes.array,
}

export default Header
