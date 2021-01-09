const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('Your bot is now online.');
    client.user.setActivity("On test oklm", { type: "playing"})
});

const fs = require('fs');

client.login("NzIyMjQwMzcxMTc3OTQ3MjQ5.XuzCHA.-_YL4lJ1HEqZ_wAUzHz2emKRFMw");

client.commands = new Discord.Collection();

fs.readdir("./Commandes/", (error, f)=> {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.lenght <= 0) return console.log("Aucune commande trouvée !");

    commandes.forEach((f) => {

        let commande =  require(`./Commandes/${f}`);
        console.log(`${f} commande chargée !`)

    client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
    });
});