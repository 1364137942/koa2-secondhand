import 'whatwg-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../apps/index/registerPage/registerPage'
if (module.hot) {
  module.hot.accept()
}
ReactDOM.render( <App />,
  document.getElementById("app"));

