import React, { Component, Fragment } from 'react'
import Alert from '@material-ui/lab/Alert';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import BlockButton from '../../ui/BlockButton';
import { Card, Grid, InputLabel } from '@material-ui/core';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';


class ServerEdit extends Component {

    state = {
        interval: this.props.data[0]?.interval ?? 60,
        names: this.props.data[0]?.names.join("\n") ?? this.props.t("functions.doServerEdit.names.value"),
    }

    handleChange(event) {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    }

    send() {
        const conf = [];
        conf.push({ ...this.state, names: this.state.names.split('\n') });
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
                        <InputLabel style={{ marginTop: '1rem' }} id="interval">{t("functions.doServerEdit.interval")}</InputLabel>
                        <TextValidator
                            labelid="interval"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="number"
                            name="interval"
                            value={this.state.interval}
                        />
                        <InputLabel style={{ marginTop: '1rem' }} id="names">{t("functions.doServerEdit.names.key")}</InputLabel>
                        <TextValidator
                            labelid="names"
                            style={{ width: "50%" }}
                            onChange={(e) => this.handleChange(e)}
                            type="text"
                            multiline
                            rowsMax={10}
                            name="names"
                            value={this.state.names}
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

export default connect(mapStateToProps, null)(withTranslation()(ServerEdit))