import pino, { TransportSingleOptions } from "pino";
import { CONFIG } from "@/config/config";
import { CONFIG_CONSTANTS } from "@/constants/config.constant";
import { getCurrentDateTime } from "@/utils/date-time.util";

class Logger {
  private static instance: pino.Logger | null = null;

  private constructor() { }

  public static getInstance() {
    if (Logger.instance) return Logger.instance;

    let transport: TransportSingleOptions | undefined;

    if (CONFIG.NODE_ENV === CONFIG_CONSTANTS.ENVS.DEV) {
      transport = {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
          messageFormat: "{msg}\nmethod: {method}\nurl: {url}\nstatus: {statusCode}"
        }
      };
    }

    Logger.instance = pino({
      level: CONFIG.LOG_LEVEL, // Set log level based on environment
      timestamp: () => `,"timestamp":"${getCurrentDateTime()}"`,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
        bindings: (bindings) => {
          return {
            pid: bindings.pid,
            host: bindings.hostname,
            node_version: process.version
          };
        },
      },
      transport
    });

    return Logger.instance;
  }
}

export const logger = Logger.getInstance();
