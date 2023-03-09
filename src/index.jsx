import React from 'react'
import ReactDOM from 'react-dom'
import Container from 'react-bootstrap/Container'

// App Components
import { MainView } from './components/main-view/main-view'

// Import statement — need to bundle `./index.scss`
import './index.scss';

// Main component
class DeppFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Finds the root
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(DeppFlixApplication), container);