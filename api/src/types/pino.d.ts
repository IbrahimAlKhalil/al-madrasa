declare module 'pino' {
    namespace x {
      type LoggerOptions = any;
      type Logger = any;
    }

    declare function x(...args: any[]): any;

    export = x;
  }
