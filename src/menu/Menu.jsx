import { Divider, Grid, List, ListItem, ListItemText, ListSubheader, Typography, } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { loadNavItems } from '../redux/actions/NavigationActions';
import Spinner from "../ui/Spinner"
import MenuItem from './MenuItem';



class Menu extends Component {

    componentDidMount() {
        this.props.onNavInit();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.navItems !== nextProps.navItems || this.props.navLoading !== nextProps.navLoading) {
            return true
        }
        return false
    }

    render() {
        return <div>
            <List>
                <ListItem button component={Link} to="/start" >
                    <ListItemText primary={<Typography component="div">
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>Dashboard</Grid>
                        </Grid>
                    </Typography>} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListSubheader inset>Functions</ListSubheader>
                {this.props.loadNavItems ? <Spinner /> : this.props.navItems.functions?.map(e => <MenuItem key={e.name} type="do" name={e.name} buttonState={e.enabled} />)}
            </List>
            <Divider />
            <List>
                <ListSubheader inset>Commands</ListSubheader>
                {this.props.loadNavItems ? <Spinner /> : this.props.navItems.commands?.map(e => <MenuItem key={e.name} type="command" name={e.name} buttonState={e.enabled} />)}
            </List>
            <Divider />
            <List>
                <ListSubheader inset>Events</ListSubheader>
                {this.props.loadNavItems ? <Spinner /> : this.props.navItems.events?.map(e => <MenuItem key={e.name} type="get" name={e.name} buttonState={e.enabled} />)}
            </List>
        </div>
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onNavInit: () => dispatch(loadNavItems())
    }
}

const mapStateToProps = (state) => {
    return {
        navItems: state.navigation.items,
        navLoading: state.navigation.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu))