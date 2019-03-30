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
                owner: fetchedOwnerID
            };
            return user;
        } else {
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
                bots: body.bots
            };
            return user;
        };
    };
};