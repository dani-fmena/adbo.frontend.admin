interface IConfig {
    site: {
        name: string;
        api: string;
    },
    auth: {
        grand_type: string
    }
}

function getConfig (): IConfig {
    return {
        site: {
            // api: 'https://un2x3.azurewebsites.net/api/v1/',
            api: 'http://localhost:8000/',
            name: 'AdbO'
        },
        auth: {
            grand_type: 'password'                                          // Oauth2 flow / grand type
        }
    }
}

const config = getConfig()

export default config

