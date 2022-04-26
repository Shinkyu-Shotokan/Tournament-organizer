import React from "react";
import PropTypes from 'prop-types'

const Header = ({ onToggle, showAdd }) => {
    return (
            <header className='header'>
                <h1>{showAdd ? 'Add Student' : 'Certificate Maker'}</h1>
                <div>
                    {!showAdd && <button onClick={onToggle} style={{ backgroundColor: 'gray' }} className='btn'>
                        Generate All Certificates
                    </button>}
                    <button onClick={onToggle} style={{ backgroundColor: 'gray' }} className='btn'>
                        {showAdd ? 'Cancel' : 'Add Student'}
                    </button>
                </div>
            </header>
    )
}

Header.defaultProps = {
    title:"Promotional Certificate Generator",
}

Header.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    conClick: PropTypes.func,
}

export default Header
