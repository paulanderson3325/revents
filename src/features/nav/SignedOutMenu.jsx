import React from "react"
import { Menu, Button } from "semantic-ui-react"

export default function SignedOutMenu({ setAuthenticted }) {
  return (
    <Menu.Item position='right'>
      <Button onClick={() => setAuthenticted(true)} basic inverted content='Login' />
      <Button
        basic
        inverted
        content='Register'
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  )
}
