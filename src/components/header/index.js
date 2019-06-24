import React from 'react'
import { Container, Search, User } from '../header/styles';

const Header = () => (
  <Container>
    <Search>
      <input placeholder="Search" />
    </Search>
    <User>
      <img src="https://avatars2.githubusercontent.com/u/2254731?v=4" alt="Avatar" />
      Diego Fernandes
    </User>
  </Container>
)

export default Header;