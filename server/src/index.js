require('dotenv').config();

const { connectDb } = require('./db');
const { createApp } = require('./app');

async function main() {
	const port = process.env.PORT || 5000;

	await connectDb(process.env.MONGO_URI);

	const app = createApp();
	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(`Server listening on :${port}`);
	});
}

main().catch((err) => {
	// eslint-disable-next-line no-console
	console.error(err);
	process.exit(1);
});
