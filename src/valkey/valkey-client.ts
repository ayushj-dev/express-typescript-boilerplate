import { CONFIG } from "@/config/config";
import Valkey from "iovalkey";

const options = {
    host: CONFIG.VALKEY_HOST,
    port: CONFIG.PORT
};

let valkey: Valkey;

export const getValkeyInstance = () => {
    if (!valkey) {
        valkey = new Valkey(options)
    }

    return valkey;
}
