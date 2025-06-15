/* Do not change the order of imports as it is crucial in order for app to work as expected */

import { CONFIG } from '@/config/config';
import { app } from '@/app/app';

app.listen(CONFIG.PORT, () => {
  console.log(`Server is running on port ${CONFIG.PORT} in ${CONFIG.NODE_ENV} mode`);
});
