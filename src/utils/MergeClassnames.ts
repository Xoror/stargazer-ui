const mergeClassnames = (...args: (string | undefined)[]) => {
    return args.filter(arg => arg != undefined).join(" ")
}

export default mergeClassnames