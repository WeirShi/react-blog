/**
 * 合并
 * @param {*} target
 */
export const merge = function (target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }

    return target;
};

/**
 * 等待
 *
 * @param {Number} millisecond
 * @returns
 */
export const sleep = function (millisecond) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, millisecond);
    });
};

/**
 * 是否拥有class
 *
 * @param {Object} elements -元素
 * @param {String} cName -class名称
 * @returns {Boolean}
 */
export const hasClass = function (elements, cName) {
    return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
};

/**
 * 增加class
 *
 * @param {Object} elements
 * @param {String} cName
 */
export const addClass = function (elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += ' ' + cName;
    }
};

/**
 * 移除class
 *
 * @param {Object} elements
 * @param {String} cName
 */
export const removeClass = function (elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' '); // replace方法是替换
    }
};

/**
 * 是否允许页面滚动
 *
 * @param {Boolean} allow true-允许；false-禁止
 */
export const toggleScroll = function (allow) {
    if (!allow) {
        addClass(document.querySelector('body'), 'o-hidden');
        addClass(document.querySelector('html'), 'o-hidden');
    } else {
        removeClass(document.querySelector('body'), 'o-hidden');
        removeClass(document.querySelector('html'), 'o-hidden');
    }
};

/**
 * 类型判断
 *
 */
export const is = {
    Object(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    },

    Array(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    },

    Null(o) {
        return Object.prototype.toString.call(o) === '[object Null]';
    },

    Date(o) {
        return Object.prototype.toString.call(o) === '[object Date]';
    },

    String(o) {
        return Object.prototype.toString.call(o) === '[object String]';
    },

    Undefined(o) {
        return Object.prototype.toString.call(o) === '[object Undefined]';
    },

    Function(o) {
        return Object.prototype.toString.call(o) === '[object Function]';
    }
};

/**
 * LocalStorage
 *
 */
export const localStorage = {
    /**
     * 存储localStorage
     * @param {*} name 键
     * @param {*} content 值
     */
    set(key, value) {
        if (!key) return;
        let _value = value;
        if (typeof value !== 'string') {
            _value = JSON.stringify(_value);
        }
        window.localStorage.setItem(key, _value);
    },

    /**
     * 获取localStorage
     * @param {*} name 键
     */
    get(key) {
        if (!key) return;
        let value = window.localStorage.getItem(key);
        try {
            value = JSON.parse(value);
        } catch (error) { }
        return value;
    },

    /**
     * 删除localStorage
     * @param {*} name 键
     */
    remove(key) {
        if (!key) return;
        window.localStorage.removeItem(key);
    }
};

/**
 * 判断数组相等
 *
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns
 */
export const arrayEqual = function (arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

/**
 * 设置光标位置
 * @param textDom
 * @param pos
 */
export function setCaretPosition(textDom, pos) {
    if (textDom.setSelectionRange) {
        // IE Support
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    } else if (textDom.createTextRange) {
        // Firefox support
        let range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

/**
 * 动态加载脚本
 *
 * @export
 * @param {any} url
 * @param {any} callback
 */
export function loadScript(url, callback = function () { }) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
        // IE
        script.onreadystatechange = function () {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                callback();
            } else {
                throw new Error('加载失败');
            }
        };
    } else {
        // Others
        script.onload = function () {
            callback();
        };
        script.onerror = function () {
            setTimeout(function () {
                throw new Error('加载失败');
            }, 0);
        };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * 滚动到指定元素
 *
 * @export
 * @param {any} container
 * @param {any} selected
 * @returns
 */
export function scrollIntoView(container, selected) {
    if (!selected) {
        container.scrollTop = 0;
        return;
    }

    const top = selected.offsetTop;
    const bottom = selected.offsetTop + selected.offsetHeight;
    const viewRectTop = container.scrollTop;
    const viewRectBottom = viewRectTop + container.clientHeight;

    if (top < viewRectTop) {
        container.scrollTop = top;
    } else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight;
    }
}

/**
 * 滚到到指定高度
 *
 * @export
 * @param {any} to
 * @param {any} time
 * @param {any} callback
 */
export function scrollTo(container, to, time, callback) {
    let scrollFrom = parseInt(container.scrollTop);
    let i = 0;
    let runEvery = 5;
    const _to = parseInt(to);
    const _time = time / runEvery;

    let interval = setInterval(function () {
        i++;
        container.scrollTop = (_to - scrollFrom) / _time * i + scrollFrom;
        if (i >= _time) {
            if (callback) callback();
            clearInterval(interval);
        }
    }, runEvery);
}

/**
 * 获取顶级域名
 * @return {string} [顶级域名]
 */
export function getTDL() {
    return window.location.host
        .split('.')
        .slice(-2)
        .join('.');
}

/**
 * 日期格式化
 * @param input 输入的值
 * @param format 格式
 * @returns {string}
 */
export function dateFormat(_value, _format) {
    let value = _value;
    if (!value) return value;
    if (Object.prototype.toString.call(value) === '[object String]') {
        value = value.replace(/-/g, '/');
    }
    if (Object.prototype.toString.call(value) !== '[object Date]') {
        value = new Date(value);
    }

    let format = _format || 'yyyy-MM-dd hh:mm:ss';
    let args = {
        'M+': value.getMonth() + 1,
        'd+': value.getDate(),
        'h+': value.getHours(),
        'm+': value.getMinutes(),
        's+': value.getSeconds(),
        'q+': Math.floor((value.getMonth() + 3) / 3), // quarter
        S: value.getMilliseconds()
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (String(value.getFullYear())).substr(4 - RegExp.$1.length));
    for (let i in args) {
        if (args.hasOwnProperty(i)) {
            let n = args[i];
            if (new RegExp('(' + i + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr((String(n)).length));
        }
    }
    return format;
}

/**
 * 判断使用class
 *
 * @export
 * @param {string} className css类名
 * @param {boolean} cond 条件
 * @returns
 */
export function jClass(className, cond) {
    return cond ? className : '';
}

/**
 * react-class
 *
 * @export
 * @param {string[]} className css类名数组
 * @returns
 */
export function classNames(classNames) {
    return classNames.join(' ');
}

/**
 * 判断元素
 *
 * @export
 * @param {element} element 元素
 * @param {boolean} cond 条件
 * @returns
 */
export function jElement(element, cond) {
    return cond ? element : '';
}

export function classNameFormat(obj) {
    return Object.entries(obj).map(([a, b]) => (b ? a:'')).join(' ');
}

export const noop = () => { };