module.exports = (msg, amount) => {
    msg.delete();
	msg.channel.bulkDelete(amount, true)
	.catch(console.error);
}