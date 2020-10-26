import React, { Component, Fragment } from 'react'
import Alert from '@material-ui/lab/Alert';
import { ValidatorForm } from 'react-material-ui-form-validator';
import BlockButton from '../../ui/BlockButton';
import { Card, Chip, Grid, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getServerGroups } from '../../redux/actions/ServerGroupsActions';
import { connect } from 'react-redux';


class Test extends Component {

    state = {
        rights: []
    }

    componentDidMount() {
        this.props.onServerGroupsFetch();
        this.setState({ ...this.state, rights: this.props?.data[0]?.rights ?? [] })
    }

    handleChange(event) {
        this.setState({ ...this.state, rights: event.target.value });
    }

    send() {
        const conf = [];
        conf.push({ rights: this.state.rights });
        this.props.send(conf);
    }


    render() {
        return <Fragment>
            <Grid item xs={12} md={12} lg={12}>
                {this.props.data.length === 0 ? <Alert style={{
                    marginBottom: "1.5rem"
                }} elevation={6} variant="filled" severity="info"> Adjust conf before using </Alert> : null}
                <Card style={{
                    padding: "1rem 1.5rem",
                    marginBottom: "1.5rem"
                }}>
                    <ValidatorForm
                        ref="form"
                        onError={(errors) => null}
                        onSubmit={(e) => null}
                    >
                        <InputLabel id="demo-mutiple-chip-label">Uprawnienia</InputLabel>
                        <Select
                            labelid="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            style={{ width: "50%" }}
                            multiple
                            value={this.state.rights}
                            onChange={(e) => this.handleChange(e)}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div>
                                    {selected.map((value) => {
                                        return < Chip key={value} label={(this.props.groups.find(el => el.sgid === value)?.name)} />
                                    })}
                                </div>
                            )}
                        >
                            {this.props.groups.map((group) => (
                                group.type !== 0 ?
                                    <MenuItem key={group.sgid} value={group.sgid}>
                                        {group.name}
                                    </MenuItem>
                                    : null
                            ))}
                        </Select>
                    </ValidatorForm>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <BlockButton onClick={() => this.send(this.state)} text="Zapisz" />
                    </div>
                </Card>
            </Grid>
        </Fragment>
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.servergroups.loading,
        groups: state.servergroups.items,
        processing: state.config.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onServerGroupsFetch: () => dispatch(getServerGroups())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)