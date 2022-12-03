require('dotenv').config();

const fs = require('fs');
const ROLES = JSON.parse(fs.readFileSync('./jsons/roles.json'));

module.exports = (interaction) => {
    if (interaction.isButton()) {
        const role = interaction.guild.roles.cache.get(
          ROLES[interaction.customId.toUpperCase()]
        );
    
        if (!role)
          return interaction.reply({ content: 'Rola nie znaleziona', ephemeral: true });
    
        const hasRole = interaction.member.roles.cache.has(role.id);
        console.log(hasRole);
    
        if (hasRole)
          return interaction.member.roles
            .remove(role)
            .then((member) =>
              interaction.reply({
                content: `Rola ${role} została tobie odebrana ${member}`,
                ephemeral: true,
              })
            )
            .catch((err) => {
              console.log(err);
              return interaction.reply({
                content: `Coś poszło nie tak. Rola ${role} nie została tobie odebrana ${member}`,
                ephemeral: true,
              });
            });
        else
          return interaction.member.roles
            .add(role)
            .then((member) =>
              interaction.reply({
                content: `Rola ${role} została tobie nadana ${member}`,
                ephemeral: true,
              })
            )
            .catch((err) => {
              console.log(err);
              return interaction.reply({
                content: `Coś poszło nie tak. Rola ${role} nie została tobie nadana ${member}`,
                ephemeral: true,
              });
            });
      }
}