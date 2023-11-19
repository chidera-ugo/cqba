// qss has been slightly modified and inlined here for our use cases (and compression's sake). We've included it as a hard dependency for MIT license attribution.

export function encode(obj: any, pfx?: string) {
  let k,
    i,
    tmp,
    str = '';

  for (k in obj) {
    if ((tmp = obj[k]) !== void 0) {
      if (Array.isArray(tmp)) {
        for (i = 0; i < tmp.length; i++) {
          str && (str += '&');
          str += encodeURIComponent(k) + '=' + encodeURIComponent(tmp[i]);
        }
      } else {
        str && (str += '&');
        str += encodeURIComponent(k) + '=' + encodeURIComponent(tmp);
      }
    }
  }

  return (pfx || '') + str;
}

function toValue(mix: any) {
  if (!mix) return '';
  const str = decodeURIComponent(mix);
  if (str === 'false') return false;
  if (str === 'true') return true;
  return +str * 0 === 0 && +str + '' === str ? +str : str;
}

export function decode(str: any) {
  let tmp, k;

  const out: any = {},
    arr = str?.split('&');

  while ((tmp = arr?.shift())) {
    tmp = tmp.split('=');
    k = tmp.shift();
    if (out[k] !== void 0) {
      out[k] = [].concat(out[k], toValue(tmp.shift()) as any);
    } else {
      out[k] = toValue(tmp.shift());
    }
  }

  return out;
}
