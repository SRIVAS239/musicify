import React from "react";
import { MENU_URL } from "../utils/constants";

class UserClass extends React.Component{
    constructor(props){
        super(props);
        console.log("chiold constructor method loading");
        this.state = {
            descInfo : {
                "description": "Welcome to our store",
                "count" : "0"
            }
        }
    }

    async componentDidMount(){
        console.log("child componentDidMount method loading");
        // Example: Fetch from a proper JSON API endpoint
        const data = await fetch(MENU_URL);
        const jsonData = await data.json();
        console.log(jsonData.data.cards[0].card.card.description);
        console.log("Fetched data in child componentDidMount", jsonData.data.cards[0].card.card);
        this.setState({
            descInfo : jsonData.data.cards[0].card.card,
        }, () => {
            // This callback runs AFTER state is updated
            console.log("Updated state:", this.state.descInfo);
        })
    }

    componentDidUpdate(){
        console.log("child componentDidUpdate method loading");
         console.log("Updated state:", this.state.descInfo);
    }
    
    render(){
        //destructure
        const {name}= this.props;
        const {descInfo} = this.state;
        console.log("child render method loading");
        return (
           <div style = {{backgroundColor : "lightgrey", padding : "10px", margin : "10px",width : "200px"}}>
                <h4>Name: {name}</h4>
                <p>Description: {descInfo.description}</p>
                <p>Count: {descInfo.count}</p>
            </div> 
        );
    }
}

export default UserClass;

/*
* Lifecycle methods in Class Component
* Mounting Phase:---------------------------
* 1. constructor() - initializes state and binds methods
* 2. static getDerivedStateFromProps() - sync state with props
* 3. render() - returns JSX to render UI
* 4. componentDidMount() - called after component is mounted, ideal for API calls   
* 5. API calls can be made here
*6. setState can be used here to update state
*
*Updating Phase:---------------------------
* 1. static getDerivedStateFromProps() - sync state with props  
* 2. shouldComponentUpdate() - optimize re-rendering by returning true/false
* 3. render() - returns JSX to render UI
* 4. getSnapshotBeforeUpdate() - capture info before DOM updates
* 5. componentDidUpdate() - called after component updates, ideal for DOM operations or API calls
* 6. setState can be used here to update state  
*
*/