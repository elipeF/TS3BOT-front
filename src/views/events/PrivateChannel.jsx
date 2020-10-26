import React, { Component, Fragment } from 'react'
import Alert from '@material-ui/lab/Alert';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import BlockButton from '../../ui/BlockButton';
import { Card, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getChannelGroups } from '../../redux/actions/ChannelGroupsActions';


class PrivateChannel extends Component {

    state = {
        channel: this.props.data[0]?.channel ?? [],
        zone: this.props.data[0]?.zone ?? 0,
        prefix: this.props.data[0]?.prefix ?? this.props.t("events.getPrivateChannel.prefix.value"),
        validity: this.props.data[0]?.validity ?? 1,
        group: this.props.data[0]?.group ?? 0,
        guest: this.props.data[0]?.guest ?? 0,
        channelName: this.props.data[0]?.channelName ?? this.props.t("events.getPrivateChannel.channelName.value"),
        subchannelscount: this.props.data[0]?.subchannelscount ?? 3,
        subchannelsname: this.props.data[0]?.subchannelsname ?? this.props.t("events.getPrivateChannel.subchannelsname.value"),
    }

    componentDidMount() {
        this.props.onChannelGroupsFetch();
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    send() {
        const conf = [];
        conf.push({ ...this.state, channel: typeof this.state.channel === "string" ? this.state.channel.split(',') : this.state.channel });
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
                        <InputLabel style={{ marginTop: '1rem' }} id="channel">{t("events.getPrivateChannel.channel")}</InputLabel>
                        <TextValidator
                            labelid="channel"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            name="channel"
                            value={this.state.channel}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="zone">{t("events.getPrivateChannel.zone")}</InputLabel>
                        <TextValidator
                            labelid="zone"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            name="zone"
                            value={this.state.zone}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="prefix">{t("events.getPrivateChannel.prefix.key")}</InputLabel>
                        <TextValidator
                            labelid="prefix"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            name="prefix"
                            value={this.state.prefix}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="validity">{t("events.getPrivateChannel.validity")}</InputLabel>
                        <TextValidator
                            labelid="validity"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            name="validity"
                            value={this.state.validity}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="group">{t("events.getPrivateChannel.group")}</InputLabel>
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
                        <InputLabel style={{ marginTop: '1rem' }} id="guest">{t("events.getPrivateChannel.guest")}</InputLabel>
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
                        <InputLabel style={{ marginTop: '1rem' }} id="channelName">{t("events.getPrivateChannel.channelName.key")}</InputLabel>
                        <TextValidator
                            labelid="channelName"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            name="channelName"
                            value={this.state.channelName}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="subchannelscount">{t("events.getPrivateChannel.subchannelscount")}</InputLabel>
                        <TextValidator
                            labelid="subchannelscount"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            name="subchannelscount"
                            value={this.state.subchannelscount}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="subchannelsname">{t("events.getPrivateChannel.subchannelsname.key")}</InputLabel>
                        <TextValidator
                            labelid="subchannelsname"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            name="subchannelsname"
                            value={this.state.subchannelsname}
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PrivateChannel))