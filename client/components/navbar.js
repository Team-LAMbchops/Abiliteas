import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, resetApp} from '../store'
import {emptyCart} from '../store/cart'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1>ABILITEAS</h1>
    <nav id="nav">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/teas">See Our Teas</Link>
          <Link to="/profile">Profile</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>

          {isAdmin ? (
            <div>
              <Link to="/admin">Admin</Link>
            </div>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/teas">See Our Teas</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    async handleClick() {
      await Promise.all([
        dispatch(logout()),
        dispatch(resetApp()),
        dispatch(emptyCart())
      ])
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
