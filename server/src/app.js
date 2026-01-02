const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const contactsRouter = require('./routes/contacts');
const { notFound, errorHandler } = require('./middleware/errorHandler');

function createApp() {
	const app = express();

	app.use(cors());
	app.use(express.json());
	app.use(morgan('dev'));

	app.get('/api/health', (req, res) => {
		res.json({ status: 'ok' });
	});

	app.use('/api/contacts', contactsRouter);

	// Serve built client (optional)
	const shouldServeClient =
		String(process.env.SERVE_CLIENT).toLowerCase() === 'true' ||
		String(process.env.NODE_ENV).toLowerCase() === 'production';

	if (shouldServeClient) {
		const clientDist = path.resolve(__dirname, '../../client/dist');
		const indexHtml = path.join(clientDist, 'index.html');
		if (fs.existsSync(indexHtml)) {
			app.use(express.static(clientDist));
			app.get('*', (req, res, next) => {
				if (req.path.startsWith('/api')) return next();
				res.sendFile(indexHtml);
			});
		}
	}

	app.use(notFound);
	app.use(errorHandler);

	return app;
}

module.exports = { createApp };
