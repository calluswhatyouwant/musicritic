/* eslint-disable no-restricted-syntax, guard-for-in */

const objectToJson = object => {
    const obj: any = {};

    for (const key in object) {
        obj[key] = object[key];
    }

    return obj;
};

export default objectToJson;
