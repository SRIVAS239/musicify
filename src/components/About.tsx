import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";
import { AboutDesc } from "./AboutDesc";

class About extends Component {
  constructor(props: {}) {
    super(props);
    console.log("Parent About - constructor");
  }

  componentDidMount() {
    console.log("Parent About - componentDidMount");
  }

  render() {
    console.log("Parent About - render");
    return (
      <div>
        <User />
        <UserClass name={"soumya"} />
        <AboutDesc />
      </div>
    );
  }
}

export default About;
