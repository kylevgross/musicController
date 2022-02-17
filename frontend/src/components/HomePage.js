import React, { Component } from 'react';
import RoomJoin from "./RoomJoin";
import CreateRoomPage from "./CreateRoomPage";
import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Room from "./Room";
import Info from "./info";

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {roomCode: null,
        };
        this.cleaRoomCode = this.cleaRoomCode.bind(this);
        }

    async componentDidMount() {
        fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {this.setState({roomCode: data.code});
        });
        }

    renderHomePage () {
        return (
                <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                <Typography variant="h3" component="h3">
                    HouseParty
                </Typography>
                </Grid>
                <Grid item xs={12}align="center" >
                    
                <ButtonGroup disableElevation variant="conatined" color="primary">
                <Button variant="contained" color="primary" to="/join" component={Link}>Join a Room</Button>
                <Button variant="contained" color="default" to="/info" component={Link}>Info</Button>
                <Button variant="contained" color="secondary" to="/create" component={Link}>Create a Room</Button>
                </ButtonGroup>
                </Grid>
                </Grid>
        );
    }


    cleaRoomCode() {
        this.setState({
            roomCode: null,
        });
    }
    render() {
        return (<Router>
            <Switch>
                <Route exact path='/' render={() => {
                    return this.state.roomCode ?  (<Redirect to={`/room/${this.state.roomCode}`}/>) : this.renderHomePage() 
                }}/>
                 
                <Route path='/join' component={RoomJoin}></Route>
                <Route path='/info' component={Info}></Route>
                <Route path='/create' component={CreateRoomPage}></Route>
                <Route path='/room/:roomCode' 
                render={(props) => {
                    return <Room {...props} leaveRoomCallback={this.cleaRoomCode} />;
                }}
                />
            </Switch>
        </Router>
        );
    }
}