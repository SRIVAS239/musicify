import { Component } from "react";
export class AboutDesc extends Component{
    constructor(props){
        super(props);
        console.log("AboutDesc - constructor");
    }
    componentDidMount(){
        console.log("AboutDesc - componentDidMount");
    }
    render(){
        console.log("AboutDesc - render");
        return (
            <div>
                This is about us description component
            </div>
        );
    }
}

