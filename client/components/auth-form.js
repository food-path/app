import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Form, Button} from 'react-bootstrap'

/**
  It looks like this file was created on an editor where the linter settings did not enforce semi-colons (actually - it seems like the one we use in boilermaker). As the rest of the project seems to have semi-colons, we should update the format of this file to match.
*/


/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  
  return (
    <div className="login-signup-container">
      <h3 className="form-name">{displayName}</h3>
      <Form onSubmit={handleSubmit} className="form-signup2" name={name}>
        {displayName === 'Sign Up' && (
          <Form.Row className="form-row">
            <Form.Group controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First Name"
                name="firstName"
              />
              <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                name="lastName"
              />
              <Form.Control.Feedback>LooksGood!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        )}

        <Form.Row className="form-row">
          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              name="email"
            />
          </Form.Group>

          <Form.Group controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              aria-describedby="passwordHelpMsg"
              name="password"
            />
            <Form.Text id="passwordHelpMsg" muted>
              Must be 6-20 characters long.
            </Form.Text>
          </Form.Group>
        </Form.Row>

        <Button type="submit" variant="secondary" className="button-cart">
          Submit
        </Button>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      const formName = evt.currentTarget.name

      evt.preventDefault()
      //const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        console.log('dispatching')
        dispatch(auth(email, password, formName, firstName, lastName))
      } else {
        console.log('not sign up')
        dispatch(auth(email, password, formName))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
