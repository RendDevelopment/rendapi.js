const fetch = require("node-superfetch");

module.exports = class RendDev {
    constructor(botID, ownerID) {
        this.baseURL = "https://rend-dev.glitch.me";
        this.baseAPIURL = this.baseURL + "/api";
        if (!botID) throw new Error("No bot ID was provided")
        if (!ownerID) throw new Error("No owner ID was provided")
        if (isNaN(botID)) throw new Error("Invalid Bot ID.")
        if (isNaN(ownerID)) throw new Error("Invalid Owner ID.")
        /*
        fetch.get(this.baseAPIURL + `/bots/${botID}`).then(rend => {
            if (ownerID !== rend.body.ownerID) throw new Error("Wrong Owner ID.")
        })
        */
        this.getBot = async (id) => {
            if (!id) throw Error("No bot ID was provided")
            const { body: botuser } = await fetch.get(this.baseAPIURL + `/bots/${id}`)
            const owner = await fetchUser(botuser.ownerID)
            const bot = await fetchUser(botuser.botID)
            const body = {
                owner: owner,
                bot: bot,
                prefix: botuser.prefix,
                accepted: botuser.accepted 
            }
        return body
        }

        this.fetchUser = async (id) => {
            if (!id) throw Error("No bot ID was provided")
            const user = await fetchUser(id)
        return user
        }
    }
}

async function fetchUser(userID) {
    const { body } = await fetch.get(`https://rend-dev.glitch.me/api/fetchUser?id=${userID}`)
    if (body.error === "invalid_id") throw new Error("Invalid User ID")
    return body
}
