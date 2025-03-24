const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    development: {
        baseApi: 'api',
        mockApi: 'https://apifoxmock.com/m1/4068509-0-default/api'
    },
    test: {
        baseApi: 'api',
        mockApi: 'https://apifoxmock.com/m1/4068509-0-default/api'
    },
    prod: {
        baseApi: 'api',
        mockApi: 'https://apifoxmock.com/m1/4068509-0-default/api'
    },
} as const ;
    

export default{
    env,
    ...EnvConfig[env],
    // mock
    mock: false
};