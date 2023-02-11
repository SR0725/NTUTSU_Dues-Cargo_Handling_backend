import app from '@/app';
import config from '@/utils/config';

const { port, env } = config;

app.listen(port, () => {
	console.log(`Listening to port ${port} in ${env} environment`);
});
