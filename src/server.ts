import app from './app';
import serverConfig from './config/server';

const {
  server: {port, name},
} = serverConfig;

app.listen(port, () => {
  console.log(`Listening to ${name} on port ${port}`);
});
