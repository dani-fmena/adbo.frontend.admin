interface IConfig {
    site: {
        name: string;
        api: string;
    },
}

function getConfig (): IConfig {
    return {
        site: {
            // api: 'https://un2x3.azurewebsites.net/api/v1/',
            api: 'http://localhost:8000/',
            name: 'AdbO'
        }
    }
}

const config = getConfig()

export default config

