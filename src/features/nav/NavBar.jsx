import React, { useState } from "react"
import { Menu, Container, Button } from "semantic-ui-react"
import { NavLink, useHistory } from "react-router-dom"
import SignedOutMenu from "./SignedOutMenu"
import SignedInMenu from "./SignedInMenu"

export default function NavBar({ setFormOpen }) {
  const history = useHistory()
  const [authenticated, setAuthenticted] = useState(false)

  function handleSignOut() {
    setAuthenticted(false)
    history.push('/')
  }

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name='Events' />
        {authenticated && (
          <Menu.Item as={NavLink} to='/createEvent'>
            <Button positive inverted content='Create Event' />
          </Menu.Item>
        )}
        {authenticated ? (
          <SignedInMenu signOut={handleSignOut} history={history} />
        ) : (
          <SignedOutMenu setAuthenticted={setAuthenticted} />
        )}
      </Container>
    </Menu>
  )
}
