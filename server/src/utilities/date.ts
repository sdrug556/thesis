export function dateNowUTC(): number {
  return Date.now()
}

export function assign(target: any, source: any): any {
  const keys = Object.keys(source);
  keys.forEach(key => target[key] = source[key]);
}

export function populateEntity<T>(entity: T, source: any): T {
  Object.keys(source).forEach(key => entity[key] = source[key]);
  return entity;
}
