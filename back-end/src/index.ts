import express from 'express';
import routes from './routes';

const app = express();


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.json());

app.use(routes);

app.listen(3000, () => {
	console.log('[SERVER] Running at http://localhost:3000');
});
