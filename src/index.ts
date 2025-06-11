import { app } from '@/app/app';
import { CONFIG } from '@/config/config';

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running on port ${CONFIG.PORT} in ${CONFIG.NODE_ENV} mode`);
});
