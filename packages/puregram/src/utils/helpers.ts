import http from 'http';

export const applyMixins = (derivedCtor: any, baseCtors: any[]): void => {
  for (const baseCtor of baseCtors) {
    for (const name of Object.getOwnPropertyNames(baseCtor.prototype)) {
      if (name === 'constructor') {
        continue;
      }

      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!
      );
    }
  }
};

export const isPlainObject = (object: object): boolean => (
  Object.prototype.toString.call(object) === '[object Object]'
);

export const filterPayload = (
  payload: Record<string, any>
): Record<string, any> => {
  const filteredPayload: Record<string, any> = {};

  for (const [key, value] of Object.entries(payload)) {
    const notEmpty = (
      value !== undefined
      && value !== null
    );

    const isEmptyArray = (
      Array.isArray(value)
      && value!.length === 0
    );

    if (notEmpty && !isEmptyArray) {
      if (isPlainObject(value)) {
        filteredPayload[key] = filterPayload(value);
      } else {
        filteredPayload[key] = value;
      }
    }
  }

  return filteredPayload;
};

export const isParseable = (source: string): boolean => {
  try {
    JSON.parse(source);

    return true;
  } catch (e) {
    return false;
  }
};

export const delay = (delayed: number): Promise<void> => (
  new Promise((resolve): void => {
    setTimeout(resolve, delayed);
  })
);

export const useLazyLoad = <T>(fn: () => T): () => T => {
  let called = false;
  let value: T;

  return (): T => {
    if (called) {
      return value;
    }

    value = fn();
    called = true;

    return value;
  };
};

const replaceRegexpChar = (char: string): string => (
  char
    .replace(/\//g, '\\/')
    .replace(/\\/g, '\\\\')
    .replace(/\[/g, '\\[')
    .replace(/]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\*/g, '\\*')
);

export const replaceChars = (source: string, chars: string[] | string): string => {
  let edited: string = source;
  const actualChars: string[] = !Array.isArray(chars) ? chars.split('') : chars;

  for (const char of actualChars) {
    edited = edited.replace(
      new RegExp(
        replaceRegexpChar(char),
        'g'
      ),
      `\\${char}`
    );
  }

  return edited;
};

// https://github.com/negezor/vk-io/blob/c4db32cdd15e17e398e88fb780bbbbe0e8b61856/packages/vk-io/src/updates/helpers.ts
export const parseRequestJSON = async (req: http.IncomingMessage): Promise<Record<string, any>> => {
  const chunks = [];
  let totalSize = 0;

  for await (const chunk of req) {
    totalSize += chunk.length;

    chunks.push(chunk);
  }

  return JSON.parse(
    Buffer.concat(chunks, totalSize).toString('utf8')
  );
};
