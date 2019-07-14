window.onload = function () {
    // 该方法的作用是选择所有元素
    let imgs = document.querySelectorAll('img');

    function getTop(e) {
        let t = e.offsetTop;
        while (e === e.offsetParent) {
            t += e.offsetTop;
        }
        return t;
    }

    function lazyload(imgs) {
        let h = window.innerHeight;
        let s = document.documentElement.scrollTop || document.body.scrollTop;
        for (let i = 0; i < imgs.length; i++) {
            if ((h + s) > getTop(imgs[i])) {
                (function (i) {
                    setTimeout(function () {
                        //console.log(i)
                        //隐形加载图片或其它资源
                        let tmp = new Image();
                        tmp.src = imgs[i].getAttribute("data-src");
                        tmp.onload = function () {
                            imgs[i].src = imgs[i].getAttribute("data-src")
                        }
                    }, 2000)
                })(i)

            }
        }

    }

    lazyload(imgs);
    window.onscroll = function () {
        lazyload(imgs)
    }
};
