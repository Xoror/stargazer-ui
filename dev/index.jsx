import React from 'react'
import ReactDOM from 'react-dom/client'

//import "../dist/styles/stargazerui.css"
import "../src/styles/_components.scss"
import "./index.scss"

import Dropdown from '../src/Dropdown'
import Nav from "../src/Nav"
import Navbar from '../src/NavBar'

import { Component } from './test'

const App = () => {
  return(
    <>
      <Navbar>
        <Nav>
            <Nav.Item>
                <Nav.Link href="#">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#">Test 2</Nav.Link>
            </Nav.Item>
        </Nav>
        <Navbar.Brand className={"navigation-link"}>
            Testing
        </Navbar.Brand >
        <Dropdown navDropdown={true} controlId='test-navdropdown'>
            <Dropdown.Toggle>Open</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item id="test-1">Test 1</Dropdown.Item>
                <Dropdown.Item id="test-2">Test 2</Dropdown.Item>
                <Dropdown.Item id="test-3">Test 3</Dropdown.Item>
                <Dropdown.Item id="test-4">Test 4</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      </Navbar>
      <Component />
    </>
  )
  };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

