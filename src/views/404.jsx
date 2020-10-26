import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <Grid item xs={12} md={12} lg={12}>
            <Box display="flex" alignItems="center" justifyContent="center"><h2>{t('system.elementNotFound')}</h2></Box>
        </Grid>
    )
}

export default NotFound;