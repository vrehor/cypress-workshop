import { identity, isEmpty, noop, omit, pickBy } from 'lodash';
import path from 'path';
import { Service } from 'typedi';
import winston from 'winston';

const colorizer = winston.format.colorize();

const COMMON_LOG_ATTRIBUTES = ['timestamp', 'level', 'message', 'source'];

const CUSTOM_LOG_ATTRIBUTES = ['requestId', 'userId', 'userRole', 'sessionId'];

/**
 * Provides an interceptor possibilities
 * e.g. adding request info to each log
 */
@Service()
export class Logger {
  private winstonLogger: winston.Logger;

  constructor(
    private requestId?: string,
    private userId?: string,
    private userRole?: string
  ) {
    this.winstonLogger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(msg => {
              const data = omit(msg, [
                ...COMMON_LOG_ATTRIBUTES,
                ...CUSTOM_LOG_ATTRIBUTES,
              ]);
              return colorizer.colorize(
                msg.level,
                `${msg.timestamp} <${msg.level}> ${CUSTOM_LOG_ATTRIBUTES.map(
                  itm => {
                    return msg[itm] ? `<${itm}:${msg[itm]}>` : null;
                  }
                )
                  .filter(itm => itm)
                  .join(' ')} ${msg.source?.file}:${msg.source?.line}${
                  msg.source?.method ? ` (${msg.source?.method})` : ''
                } ${msg.message}${
                  !isEmpty(data) ? ` ${JSON.stringify(data, null, 1)}` : ''
                }`
              );
            })
          ),
        }),
      ],
    });
  }

  static initialize(requestId?: string, userId?: string, userRole?: string) {
    return new Logger(requestId, userId, userRole);
  }

  destroy() {
    this.winstonLogger.close();
    this.winstonLogger.transports.forEach(t => t?.close?.());
    this.winstonLogger._destroy(null, noop);
  }

  // copy from trace lib (https://github.com/baryon/tracer/blob/master/lib/console.js#L32)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enrichWithStackTraceData = (data?: any) => {
    const stacklist = new Error()?.stack?.split('\n').slice(3);
    if (!stacklist) {
      return data;
    }

    data = data ?? {};
    data.source = {};

    const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
    const stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;

    const s = stacklist[0] || stacklist[0] || '',
      sp = stackReg.exec(s) || stackReg2.exec(s);

    if (sp && sp.length === 5) {
      data.source.method = sp[1];
      data.source.path = sp[2];
      data.source.line = sp[3];
      data.source.pos = sp[4];
      data.source.file = path.basename(data.source.path);
      data.source.stack = stacklist.join('\n');
    }

    return data;
  };

  getCommonMetadata = () => {
    const metadataWithoutUndefinedValues = pickBy(
      {
        requestId: this.requestId,
        userId: this.userId,
        userRole: this.userRole,
      },
      identity
    );

    return isEmpty(metadataWithoutUndefinedValues)
      ? undefined
      : metadataWithoutUndefinedValues;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log = (message: string, metadata?: any) => {
    this.winstonLogger.log(
      'info',
      message,
      this.enrichWithStackTraceData({
        ...this.getCommonMetadata(),
        ...(metadata ?? {}),
      })
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info = (message: string, metadata?: any) => {
    this.winstonLogger.info(
      message,
      this.enrichWithStackTraceData({
        ...this.getCommonMetadata(),
        ...(metadata ?? {}),
      })
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug = (message: string, metadata?: any) => {
    this.winstonLogger.debug(
      message,
      this.enrichWithStackTraceData({
        ...this.getCommonMetadata(),
        ...(metadata ?? {}),
      })
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: string, metadata?: any): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(error: Error, metadata?: any): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: string, error: Error, metadata?: any): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(param1: Error | string, param2?: Error | any, param3?: any) {
    const error: Error | undefined =
      param1 instanceof Error
        ? (param1 as Error)
        : param2 && param2 instanceof Error
        ? (param2 as Error)
        : undefined;

    const message: string =
      (param1 instanceof String ? (param1 as string) : error?.message) ??
      'Error occured';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata: any = !(param2 instanceof Error) ? param2 : param3;

    if (!error) {
      this.winstonLogger.info(
        'No error was extracted during logger.error call',
        { param1, param2, param3 }
      );
    }

    this.winstonLogger.error(
      message,
      this.enrichWithStackTraceData({
        ...this.getCommonMetadata(),
        ...(metadata ?? {}),
        error: error ? JSON.stringify(error) : undefined,
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn = (message: string, metadata?: any) => {
    this.winstonLogger.warn(
      message,
      this.enrichWithStackTraceData({
        ...this.getCommonMetadata(),
        ...(metadata ?? {}),
      })
    );
  };
}
