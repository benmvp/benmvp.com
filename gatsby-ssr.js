const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="roboto-font"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />,
  ])
}
