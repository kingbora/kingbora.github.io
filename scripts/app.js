window.onload = function() {
    var $body = document.body,
        $ajaxImgs = document.querySelectorAll(".ui-img-ajax"), //图片懒加载
        $backTop = document.getElementById("ui-back-top"),
        $article = document.querySelector(".ui-article");
        timer = null;

    function imgsAjax($targetElem) {
        if (!$targetElem) return;
        var _length = $targetElem.length;
        if (_length > 0) {
            var scrollBottom = getScrollTop() + window.innerHeight;
            for (var i = 0; i < _length; i++) {
                (function(index) {
                    var $this = $targetElem[index];
                    var $this_offsetZero = $this.getBoundingClientRect().top + window.pageXOffset - document.documentElement.clientTop;
                    var $this_src = $this.getAttribute('data-src');
                    if (scrollBottom >= $this_offsetZero && $this_src && $this_src.length > 0) {
                        if ($this.nodeName.toLowerCase() === 'img') {
                            $this.src = $this_src;
                            $this.style.display = 'block';
                        } else {
                            var imgObj = new Image();
                            imgObj.onload = function() {
                                $this.innerHTML = "";
                            };
                            imgObj.src = $this_src;
                            $this.style.backgroundImage = "url(" + $this_src + ")";
                        }
                        $this.removeAttribute('data-src');
                    }
                })(i);
            }
        }
    }
    
    //获取滚动高度
    function getScrollTop() {
        return ($body.scrollTop || document.documentElement.scrollTop);
    }

    function scrollCallback() {
        var scrollTop = getScrollTop();
        (scrollTop >= 500) ? $backTop.setAttribute("class", "show") : $backTop.removeAttribute("class", "show");
        imgsAjax($ajaxImgs);
        if ($article) {
            $.toc().fixed(scrollTop);
            $.toc().actived(scrollTop);
        }
    }

    //首次进入时图片处理
    scrollCallback();

    window.addEventListener('scroll', function fn() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            scrollCallback();
        },10);
    });

    //返回顶部动画
    $backTop.onclick = function() {
        cancelAnimationFrame(timer);
        var speed = 0;
	    timer = requestAnimationFrame(function fn() {
            var sTop = getScrollTop();
            //缓冲运动
            var step = (sTop - speed) / 50;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            speed = speed + step;
	        if (sTop > 0) {
	            $body.scrollTop = document.documentElement.scrollTop = sTop - speed;
	            timer = requestAnimationFrame(fn);
	        } else {
	            cancelAnimationFrame(timer);
	        }
	    });
    };
    

    $.toc().go();
}