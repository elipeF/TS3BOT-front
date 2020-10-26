import React, { Component, Fragment } from 'react'
import Alert from '@material-ui/lab/Alert';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import BlockButton from '../../ui/BlockButton';
import { Card, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getChannelGroups } from '../../redux/actions/ChannelGroupsActions';


class ChannelsCheck extends Component {

    state = {
        interval: this.props.data[0]?.interval ?? 60,
        zone: this.props.data[0]?.zone ?? 0,
        prefix: this.props.data[0]?.prefix ?? this.props.t("functions.doChannelsCheck.prefix.value"),
        validity: this.props.data[0]?.validity ?? 1,
        group: this.props.data[0]?.group ?? 0,
        guest: this.props.data[0]?.guest ?? 0,
        freeChannelName: this.props.data[0]?.freeChannelName ?? this.props.t("functions.doChannelsCheck.freeChannelName.value"),
    }

    componentDidMount() {
        this.props.onChannelGroupsFetch();
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    send() {
        const conf = [];
        conf.push({ ...this.state });
        this.props.send(conf);
    }


    render() {

        const { t } = this.props;

        return <Fragment>
            <Grid item xs={12} md={12} lg={12}>
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
                        <InputLabel style={{ marginTop: '1rem' }} id="interval">{t("functions.doChannelsCheck.interval")}</InputLabel>
                        <TextValidator
                            labelid="interval"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            name="interval"
                            value={this.state.interval}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="zone">{t("functions.doChannelsCheck.zone")}</InputLabel>
                        <TextValidator
                            labelid="zone"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            name="zone"
                            value={this.state.zone}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="prefix">{t("functions.doChannelsCheck.prefix.key")}</InputLabel>
                        <TextValidator
                            labelid="prefix"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            name="prefix"
                            value={this.state.prefix}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="validity">{t("functions.doChannelsCheck.validity")}</InputLabel>
                        <TextValidator
                            labelid="validity"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            name="validity"
                            value={this.state.validity}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="group">{t("functions.doChannelsCheck.group")}</InputLabel>
                        <Select
                            labelid="group"
                            style={{ width: "50%" }}
                            name="group"
                            value={this.state.group}
                            onChange={(e) => this.handleChange(e)}
                        >
                            {this.props.groups.map((group) => (
                                group.type !== 0 ?
                                    <MenuItem key={group.sgid} value={group.sgid}>
                                        {group.name}
                                    </MenuItem>
                                    : null
                            ))}
                        </Select>
                        <InputLabel style={{ marginTop: '1rem' }} id="guest">{t("functions.doChannelsCheck.guest")}</InputLabel>
                        <Select
                            labelid="guest"
                            style={{ width: "50%" }}
                            name="guest"
                            value={this.state.guest}
                            onChange={(e) => this.handleChange(e)}
                        >
                            {this.props.groups.map((group) => (
                                group.type !== 0 ?
                                    <MenuItem key={group.sgid} value={group.sgid}>
                                        {group.name}
                                    </MenuItem>
                                    : null
                            ))}
                        </Select>
                        <InputLabel style={{ marginTop: '1rem' }} id="freeChannelName">{t("functions.doChannelsCheck.freeChannelName.key")}</InputLabel>
                        <TextValidator
                            labelid="freeChannelName"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            name="freeChannelName"
                            value={this.state.freeChannelName}
                        />
                    </ValidatorForm>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <BlockButton loading={this.props.processing} onClick={() => this.send(this.state)} text={t("system.save")} />
                    </div>
                </Card>
            </Grid>
        </Fragment>
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.channelgroups.loading,
        groups: state.channelgroups.items,
        processing: state.config.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChannelGroupsFetch: () => dispatch(getChannelGroups())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ChannelsCheck))