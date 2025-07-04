const getEnv = (key: string): string => {
    let env = process.env[key]
    if (!env) {
        console.warn(`Warning: Environment variable ${key} not defined`);
        return '';
    }
    return env
}

export { getEnv }
