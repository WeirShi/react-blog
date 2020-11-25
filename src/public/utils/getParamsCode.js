/* eslint:disable */
/**
 *   获取url参数
 *   例：getParamsCode('id');
 */
export function getParamsCode(name) {
  const search =
    window.location.href.indexOf("?") > -1
      ? window.location.href.split("?")[1].split("&")
      : [];
  const params = {};
  let pos;
  for (let i = 0; i < search.length; i++) {
    pos = search[i].indexOf("=");
    if (pos > 0) {
      params[search[i].substring(0, pos)] = decodeURIComponent(
        search[i].substring(pos + 1)
      );
    }
  }
  return params[name] ? params[name] : undefined;
}
