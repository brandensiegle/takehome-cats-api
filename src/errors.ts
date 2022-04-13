export class MissingSecretError extends Error {
  name = "MissingSecretError";
  constructor() {
    super();
  }
}

export class CatUrlFetchError extends Error {
  name: string = "CatUrlFetchError";

  constructor() {
    super();
  }
}

export class NoCatImageFoundError extends Error {
  name: string = "NoCatImageFoundError";

  constructor() {
    super();
  }
}
