import { Grid, ListItem, ListItemText, Switch, Typography, withStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { changeConfMode } from '../redux/actions/ConfigActions';

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);


const MenuItem = (props) => {

    const [buttonChecked, setButtonChecked] = useState(props.buttonState ?? false);

    const { cfgname } = useParams();

    const disabledProp = {}
    if (props.buttonState === null) {
        disabledProp.disabled = true
    }

    const handleConfMode = () => {
        const newMode = !buttonChecked;
        setButtonChecked(newMode);
        props.changeConfMode(props.name, newMode)
    }

    return <ListItem {...(cfgname === props.name ? { selected: true } : {})} button component={Link} to={`/${props.name}`} >
        <ListItemText primary={<Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>{props.name.replace(props.type, "")}</Grid>
                <Grid item>
                    <AntSwitch {...disabledProp} checked={buttonChecked} onClick={handleConfMode} name={props.name} />
                </Grid>
            </Grid>
        </Typography>} />
    </ListItem>
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeConfMode: (name, enabled) => dispatch(changeConfMode(name, enabled))
    }
}

export default connect(null, mapDispatchToProps)(MenuItem)