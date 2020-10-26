import React, { Component, Fragment } from 'react'
import Alert from '@material-ui/lab/Alert';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import BlockButton from '../../ui/BlockButton';
import { Card, Chip, Grid, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { getServerGroups } from '../../redux/actions/ServerGroupsActions';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';


class PwAll extends Component {

    state = {
        rights: this.props.data[0]?.rights ?? [],
        message: this.props.data[0]?.message ?? this.props.t("commands.commandPwAll.message.value")
    }

    componentDidMount() {
        this.props.onServerGroupsFetch();
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    send() {
        const conf = [];
        conf.push({ rights: this.state.rights, message: this.state.message });
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
                        <InputLabel style={{ marginTop: '1rem' }} id="rights">{t("commands.commandPwAll.rights")}</InputLabel>
                        <Select
                            labelid="rights"
                            style={{ width: "50%" }}
                            name="rights"
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
                        <InputLabel style={{ marginTop: '1rem' }} id="message">{t("commands.commandPwAll.message.key")}</InputLabel>
                        <TextValidator
                            labelid="message"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            name="message"
                            value={this.state.message}
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(PwAll))