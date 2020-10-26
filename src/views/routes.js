import React from 'react';

const routes = [
    {
        cfgname: 'start',
        component: React.lazy(() => import('./Start'))
    },
    {
        cfgname: 'commandPing',
        component: React.lazy(() => import('./commands/Ping'))
    },
    {
        cfgname: 'commandPwAll',
        component: React.lazy(() => import('./commands/PwAll'))
    },
    {
        cfgname: 'commandPokeAll',
        component: React.lazy(() => import('./commands/PokeAll'))
    },
    {
        cfgname: 'doChannelsCheck',
        component: React.lazy(() => import('./functions/ChannelsCheck'))
    },
    {
        cfgname: 'doNicknameCheck',
        component: React.lazy(() => import('./functions/NicknameCheck'))
    },
    {
        cfgname: 'doServerEdit',
        component: React.lazy(() => import('./functions/ServerEdit'))
    },
    {
        cfgname: 'getWelcomeMessage',
        component: React.lazy(() => import('./events/WelcomeMessage'))
    },
    {
        cfgname: 'getPrivateChannel',
        component: React.lazy(() => import('./events/PrivateChannel'))
    },
    {
        cfgname: 'getAdminPoke',
        component: React.lazy(() => import('./events/AdminPoke'))
    }
]



export default routes;