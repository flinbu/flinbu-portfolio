const mathCaptcha = {
    generate: (bounds = {lower: 1, upper: 99}) => {
        let first = Math.floor(Math.random() * bounds.lower) + 1
        let second = Math.floor(Math.random() * bounds.upper) + 1
        return {
            sum: `${first} + ${second}`,
            result: first + second
        }
    }
}

module.exports = {
    mathCaptcha: mathCaptcha
}