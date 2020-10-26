import React, { Component, Fragment } from 'react'
import Alert from '@material-ui/lab/Alert';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import BlockButton from '../../ui/BlockButton';
import { Card, Grid, InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';


class NicknameCheck extends Component {

    state = {
        interval: this.props.data[0]?.interval ?? 60,
        message: this.props.data[0]?.message ?? this.props.t("functions.doNicknameCheck.message.value"),
        badWords: this.props.data[0]?.badWords ?? this.props.t("functions.doNicknameCheck.badWords.value"),
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    send() {
        const conf = [];
        conf.push({ ...this.state, badWords: this.state.badWords.split(',') });
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
                        <InputLabel style={{ marginTop: '1rem' }} id="interval">{t("functions.doNicknameCheck.interval")}</InputLabel>
                        <TextValidator
                            labelid="interval"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            name="interval"
                            value={this.state.interval}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="message">{t("functions.doNicknameCheck.message.key")}</InputLabel>
                        <TextValidator
                            labelid="message"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            name="message"
                            value={this.state.message}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="badWords">{t("functions.doNicknameCheck.badWords.key")}</InputLabel>
                        <TextValidator
                            labelid="badWords"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            name="badWords"
                            value={this.state.badWords}
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
        processing: state.config.loading
    }
}

export default connect(mapStateToProps, null)(withTranslation()(NicknameCheck))