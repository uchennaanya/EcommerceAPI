module.exports = {
resolve : {
fallback:{"crypto": require.resolve('crypto-browserify')}
}
}

module.exports = {
    resolve : {
    fallback:{"path": require.resolve('path-browserify')}
    }
    }

    module.exports = {
        resolve : {
        fallback:{"stream": require.resolve('stream-browserify')}
        }
        }

    module.exports = {
        resolve : {
        fallback:{"zlib": require.resolve('browserify-zlib')}
        }
        }
        module.exports = {
            resolve : {
            fallback:{"http": require.resolve('stream-http')}
            }
            }

            module.exports = {
                resolve : {
                fallback:{"querystring": require.resolve('querystring-es3')}
                }
                }