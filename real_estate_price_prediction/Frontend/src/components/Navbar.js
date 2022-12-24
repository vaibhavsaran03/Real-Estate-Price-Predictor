import React from 'react'
import PropTypes from 'prop-types'


const Navbar = ({icon,title}) => {
   return (
    <nav className='navbar'>
      <h2>
        <i className={icon} /> {title}
      </h2>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fa fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar

