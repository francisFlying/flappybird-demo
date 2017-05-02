/**
 * Created by Administrator on 2016/12/30.
 */
/**
 * 让任意对象移动到任意位置--缓动动画
 * @param obj
 * @param target
 */
/*function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var leader = obj.offsetLeft;
        var step = 30;
        step = target > leader ? step : -step;
        if (Math.abs(leader - target) >= Math.abs(step)) {
            leader = leader + step;
            obj.style.left = leader + "px";
        } else {
            clearInterval(obj.timer);
            obj.style.left = target + "px";
        }
    }, 15);
}*/

/**
 * 能够将 任意对象的任意属性改变到任意值
 * @param obj
 * @param json
 * @param fn
 */
function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var k in json) {
            if (k === "opacity") {
                //opacity 是小数
                var leader = getStyle(obj, k) * 100;//opacity不需要也不能给默认值
                var target = json[k] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader / 100;//opacity没有单位
            } else if (k === "zIndex") {
                obj.style.zIndex = json[k];//如果是层级就直接设置到目标值
            } else {
                var leader = parseInt(getStyle(obj, k)) || 0;
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[k] = leader + "px";
            }
            if (leader !== target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}