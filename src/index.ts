import { CONFIG } from './config/config';
import app from './app';

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running on port ${CONFIG.PORT} in ${CONFIG.NODE_ENV} mode`);
});
