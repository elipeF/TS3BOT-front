import React, { Component, Fragment } from 'react'
import Alert from '@material-ui/lab/Alert';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import BlockButton from '../../ui/BlockButton';
import { Card, Chip, Grid, Input, InputLabel, List, ListItem, ListItemText, MenuItem, Select, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { getServerGroups } from '../../redux/actions/ServerGroupsActions';


class AdminPoke extends Component {

    state = {
        data: this.props.data,
    }

    componentDidMount() {
        this.props.onServerGroupsFetch();
    }

    handleChange(event, index) {
        this.setState({
            ...this.state, data: this.state.data.map((el, ind) => {
                if (+index === ind) {
                    return {
                        ...el,
                        [event.target.name]: event.target.value
                    }
                } else {
                    return { ...el }
                }
            })
        });
    }

    removeElement(index) {
        this.setState({
            data: [...this.state.data.slice(0, index), ...this.state.data.slice(index + 1)]
        })
        this.send();
    }

    send() {
        const conf = this.state.data.map((el, ind) => {
            for (const key in el) {
                if (key === 'channel') {
                    return {
                        ...el,
                        channel: typeof el.channel === "string" ? el.channel.split(',') : el.channel
                    }
                }
            }
            return {
                ...el
            }
        })
        this.props.send(conf);
    }

    addNewElement() {
        this.setState({ ...this.state, data: [...this.state.data].concat([{ channel: [], groups: [], poke: this.props.t("events.getAdminPoke.poke.value"), messageSuccess: this.props.t("events.getAdminPoke.messageSuccess.value"), messageFail: this.props.t("events.getAdminPoke.messageFail.value") }]) })
    }



    render() {

        const { t } = this.props;

        const params = new URLSearchParams(this.props.location.search);
        const element = params.get('item') ?? 0;

        const channel = this.state.data[element]?.channel ?? [];
        const groups = this.state.data[element]?.groups ?? [];
        const poke = this.state.data[element]?.poke ?? this.props.t("events.getAdminPoke.poke.value");
        const messageSuccess = this.state.data[element]?.messageSuccess ?? this.props.t("events.getAdminPoke.messageSuccess.value");
        const messageFail = this.state.data[element]?.messageFail ?? this.props.t("events.getAdminPoke.messageFail.value");


        return <Fragment>

            <Grid item xs={12} md={8} lg={8}>
                {this.props.data.length === 0 ? <Alert style={{
                    marginBottom: "1.5rem"
                }} elevation={6} variant="filled" severity="info">{t("system.setupFirst")}</Alert> : null}
                <Card style={{
                    padding: "1rem 1.5rem",
                    marginBottom: "1.5rem"
                }}>


                    <ValidatorForm
                        ref="form"
                        onError={(errors) => null}
                        onSubmit={(e) => null}
                    >
                        <InputLabel style={{ marginTop: '1rem' }} id="channel">{t("events.getAdminPoke.channel")}</InputLabel>
                        <TextValidator
                            labelid="channel"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e, element)}
                            type="number"
                            name="channel"
                            value={channel}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="groups">{t("events.getAdminPoke.groups")}</InputLabel>
                        <Select
                            labelid="groups"
                            style={{ width: "50%" }}
                            name="groups"
                            multiple
                            value={groups}
                            onChange={(e) => this.handleChange(e, element)}
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

                        <InputLabel style={{ marginTop: '1rem' }} id="poke">{t("events.getAdminPoke.poke.key")}</InputLabel>
                        <TextValidator
                            labelid="poke"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e, element)}
                            type="text"
                            name="poke"
                            value={poke}
                        />

                        <InputLabel style={{ marginTop: '1rem' }} id="messageSuccess">{t("events.getAdminPoke.messageSuccess.key")}</InputLabel>
                        <TextValidator
                            labelid="messageSuccess"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e, element)}
                            type="text"
                            name="messageSuccess"
                            value={messageSuccess}
                        />


                        <InputLabel style={{ marginTop: '1rem' }} id="messageFail">{t("events.getAdminPoke.messageFail.key")}</InputLabel>
                        <TextValidator
                            labelid="messageFail"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e, element)}
                            type="text"
                            name="messageFail"
                            value={messageFail}
                        />

                    </ValidatorForm>


                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <BlockButton color="secondary" style={{ paddingRight: "1rem" }} loading={this.props.processing} onClick={() => this.removeElement(element)} text={t("system.remove")} />
                        <BlockButton loading={this.props.processing} onClick={() => this.send(this.state)} text={t("system.save")} />
                    </div>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Card style={{
                    padding: "1rem 1.5rem",
                    marginBottom: "1.5rem"
                }}>
                    <List>
                        {this.state.data.map((el, ind) => <ListItem key={ind} {...+params.get('item') === ind ? { selected: true } : null} button component={Link} to={this.props.match.url + '?item=' + ind} >
                            <ListItemText primary={<Typography component="div">
                                <Grid component="label" container alignItems="center" justify="center" spacing={1}>
                                    <Grid item>{ind}</Grid>
                                </Grid>
                            </Typography>} />
                        </ListItem>)}
                    </List>

                    <div style={{ display: "flex" }}>
                        <BlockButton style={{ width: "100%" }} loading={this.props.processing} onClick={() => this.addNewElement()} text={t("system.add")} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(AdminPoke)))