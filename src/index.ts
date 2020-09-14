import app from './app';
import { startConnection } from './database/index';

async function main(){

	await startConnection();

	await app.listen(app.get('port'))

	console.log("Puerto", app.get('port'))

} 


main();