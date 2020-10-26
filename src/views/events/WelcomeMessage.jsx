import React, { Component, Fragment } from 'react'
import Alert from '@material-ui/lab/Alert';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import BlockButton from '../../ui/BlockButton';
import { Card, Grid, InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';


class WelcomeMessage extends Component {

    state = {
        message: this.props.data[0]?.message.join('\n') ?? this.props.t("functions.doServerEdit.names.value"),
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    send() {
        const conf = [];
        conf.push({ ...this.state, message: this.state.message.split('\n') });
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
                        <InputLabel style={{ marginTop: '1rem' }} id="message">{t("events.getWelcomeMessage.message.key")}</InputLabel>
                        <TextValidator
                            labelid="message"
                            multiline
                            rowsMax={10}
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
        processing: state.config.loading
    }
}

export default connect(mapStateToProps, null)(withTranslation()(WelcomeMessage))