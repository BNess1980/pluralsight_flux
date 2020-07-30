import React from "react";

// example of class component
class AboutPage extends React.Component {
  render() {
      // <> shorthand for <React.Fragment>
    return (
      <>
        <h2>About Page</h2>
        <p>This app uses React</p>
      </>
    );
  }
}

export default AboutPage;
