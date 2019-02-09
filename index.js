const fetch = require("node-superfetch");

module.exports = class RendDev {
    constructor(botID, ownerID) {
        if (!botID) throw new Error("No bot ID was provided. Need Help? discord.gg/c5dMfsF")
        if (!ownerID) throw new Error("No owner ID was provided. Need Help? discord.gg/c5dMfsF")
        if (isNaN(botID)) throw new Error("Invalid Bot ID.")
        //if (botID.length > 18) throw new Error("Invalid Bot Id.")
       // if (ownerID.length > 18) throw new Error("Invalid Owner Id.")
        if (isNaN(ownerID)) throw new Error("Invalid Owner ID.")
        console.log(`You logged as ${fetchUser(ownerID).then(owner => owner.tag)} with bot ${fetchUser(botID).then(botOwn => botOwn.tag)}`)
        /*
        fetch.get(this.baseAPIURL + `/bots/${botID}`).then(rend => {
            if (ownerID !== rend.body.ownerID) throw new Error("Wrong Owner ID.")
        })
        */
        this.baseURL = "https://rend-dev.glitch.me";
        this.baseAPIURL = this.baseURL + "/api";
        
        this.getBots = async (limit) => {
            let {body: bots} = await fetch.get(this.baseAPIURL + "/botsArray")
            if (limit) {
                if (limit > bots.length) throw Error("limit more than bot data was registered")
                return bots.splice(0, limit)
            } else {
                return bots
            }
        }
        
        this.getBot = async (id) => {
            if (!id) throw Error("No bot ID was provided")
            const { body: botuser } = await fetch.get(this.baseAPIURL + `/bots/${id}`)
            const owner = await fetchUser(botuser.ownerID)
            const bot = await fetchUser(botuser.botID)
            const body = {
                owner: {
                    id: owner.id,
                    username: owner.username,
                    tag: owner.tag,
                    avatar: owner.avatar,
                    avatarURL: owner.avatarURL,
                    displayAvatarURL: owner.displayAvatarURL,
                    bot: owner.bot,
                    createdTimestamp: owner.createdTimestamp,
                    createdAt: new Date(owner.createdTimestamp),
                    bots : owner.bots
                },
                bot: {
                    id: bot.id,
                    username: bot.username,
                    tag: bot.tag,
                    avatar: bot.avatar,
                    avatarURL: bot.avatarURL,
                    displayAvatarURL: bot.displayAvatarURL,
                    bot: bot.bot,
                    createdTimestamp: bot.createdTimestamp,
                    createdAt: new Date(bot.createdTimestamp),
                },
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
