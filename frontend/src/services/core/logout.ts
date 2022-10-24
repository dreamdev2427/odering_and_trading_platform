import Auth from './auth';

window.addEventListener('unload', async () => {
  await Auth.signOut();
});
