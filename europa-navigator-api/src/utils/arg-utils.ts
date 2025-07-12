export const getArg = (args: string[], flag: string): string | undefined => {
    const flagIndex = args.findIndex(arg => arg.startsWith(flag + "="));
    if (flagIndex === -1) {
        return undefined; // Flag not found
    }
    const val = args[flagIndex]
    const [key, value] = val.split('=');
    return value
};