const request = require("node-superfetch");

module.exports = async (userID) => {
    const { body } = await request.get(`https://rend-dev.glitch.me/api/fetchUser?id=${userID}`);
    if (body.error === "invalid_id") throw new Error("Invalid User ID");
    else {
        if (body.bot === true) {
            const { body: bot } = await request.get(`https://rend-dev.glitch.me/api/bots/${userID}`);
            const { body: fetchedOwnerID } = await request.get(`https://rend-dev.glitch.me/api/fetchUser?id=${bot.ownerID}`);
            fetchedOwnerID.createdAt = new Date(fetchedOwnerID.createdTimestamp).toString();
            let user = {
                id: body.id,
                username: body.username,
                discriminator: body.discriminator,
                tag: body.tag,
                avatar: body.avatar,
                avatarURL: body.avatarURL,
                displayAvatarURL: body.displayAvatarURL,
                bot: body.bot,
                createdTimestamp: body.createdTimestamp,
                createdAt: new Date(body.createdTimestamp).toString(),
                owner: fetchedOwnerID,
                prefix: bot.prefix ? bot.prefix : null,
                accepted: bot.accepted ? bot.accepted : null
            };
            return user;
        } else {
            if (body.bots.length === 0) {
                let user = {
                    id: body.id,
                    username: body.username,
                    discriminator: body.discriminator,
                    tag: body.tag,
                    avatar: body.avatar,
                    avatarURL: body.avatarURL,
                    displayAvatarURL: body.displayAvatarURL,
                    bot: body.bot,
                    createdTimestamp: body.createdTimestamp,
                    createdAt: new Date(body.createdTimestamp).toString(),
                    bots: []
                };
                return user;
            } else {
                const bots = []
                for (const raw of body.bots) {
                    const { body: fetchBot } = await request.get(`https://rend-dev.glitch.me/api/fetchUser?id=${raw.botID}`);
                    const { body: fetchOwner } = await request.get(`https://rend-dev.glitch.me/api/fetchUser?id=${raw.ownerID}`);
                    const { body: dataBot } = await request.get(`https://rend-dev.glitch.me/api/bots/${raw.botID}`);
                    let fetched = {
                        id: fetchBot.id,
                        username: fetchBot.username,
                        discriminator: fetchBot.discriminator,
                        tag: fetchBot.tag,
                        avatar: fetchBot.avatar,
                        avatarURL: fetchBot.avatarURL,
                        displayAvatarURL: fetchBot.displayAvatarURL,
                        bot: fetchBot.bot,
                        createdTimestamp: fetchBot.createdTimestamp,
                        createdAt: new Date(fetchBot.createdTimestamp).toString(),
                        owner: fetchOwner,
                        prefix: dataBot.prefix ? dataBot.prefix : null,
                        accepted: dataBot.accepted ? dataBot.accepted : null
                    };
                    bots.push(fetched);
                };
                let user = {
                    id: body.id,
                    username: body.username,
                    discriminator: body.discriminator,
                    tag: body.tag,
                    avatar: body.avatar,
                    avatarURL: body.avatarURL,
                    displayAvatarURL: body.displayAvatarURL,
                    bot: body.bot,
                    createdTimestamp: body.createdTimestamp,
                    createdAt: new Date(body.createdTimestamp).toString(),
                    bots: bots
                };
                return user;
            };
        };
    };
};