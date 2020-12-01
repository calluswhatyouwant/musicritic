export const objectToJson = (object) => {
  let obj: any = {};

  for (let key in object) {
      obj[key] = object[key];
  }

  return JSON.stringify(obj);
}
