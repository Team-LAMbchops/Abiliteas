import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, resetApp} from '../store'
import {emptyCart} from '../store/cart'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <nav className="navBackground">
      {isLoggedIn ? (
        <div className="navBar">
          {/* The navbar will show these links after you log in */}
          <span>
            <Link to="/home">
              <img
                src="/abiliteasheaderlogo.png"
                width={70}
                height={70}
                mode="fit"
              />
            </Link>
          </span>
          <span className="navBarRight">
            <span className="navBarIcon">
              <Link to="/teas">
                <img src="/tea.png" width={30} height={30} mode="fit" />
              </Link>
            </span>
            <span className="navBarIcon">
              <Link to="/profile">
                <img src="/profile.png" width={30} height={30} mode="fit" />
              </Link>
            </span>
            <span className="navBarIcon">
              <Link to="/cart">
                <img
                  src="/shoppingCart.png"
                  width={30}
                  height={30}
                  mode="fit"
                />
              </Link>
            </span>
            <span className="navBarIcon">
              <a href="#" onClick={handleClick}>
                <img src="/logout.png" width={30} height={30} mode="fit" />
              </a>
            </span>
            {isAdmin ? (
              <span className="navBarIcon">
                <Link to="/admin">
                  <img src="/adminLogo.png" width={30} height={30} mode="fit" />
                </Link>
              </span>
            ) : (
              <span />
            )}
          </span>
        </div>
      ) : (
        <div className="navBar">
          {/* The navbar will show these links before you log in */}
          <span>
            <Link to="/home">
              <img
                src="/abiliteasheaderlogo.png"
                width={70}
                height={70}
                mode="fit"
              />
            </Link>
          </span>
          <span className="navBarRight">
            <span className="navBarIcon">
              <Link to="/teas">
                <img src="/tea.png" width={30} height={30} mode="fit" />
              </Link>
            </span>
            <span className="navBarIcon">
              <Link to="/login">
                <img src="/profile.png" width={30} height={30} mode="fit" />
              </Link>
            </span>
            <span className="navBarIcon">
              <Link to="/cart">
                <img
                  src="/shoppingCart.png"
                  width={30}
                  height={30}
                  mode="fit"
                />
              </Link>
            </span>
          </span>
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
