class SmoothScroll {

    constructor(){

        this.scrollDelta = 0;
        this.scrollDirection = 1;
        this.scrollOffset = document.body.scrollTop;
        this.bindScrollEvent();
        this.render();
    }

    bindScrollEvent() {

        $('body').on('mousewheel', (e) => {
            e.preventDefault();
            var offset = e.deltaY * 0.4;
            this.scrollDelta -= offset;
            this.scrollDirection = (offset > 0) ? -1 : 1;
        });

    }

    render() {

        requestAnimationFrame(() => {
            this.render();
        });

        if (this.scrollDirection < 0) {
            if (this.scrollDelta > -1) {
                this.scrollDelta = 0;
                return;
            }
        } else {
            if (this.scrollDelta < 1) {
                this.scrollDelta = 0;
                return;
            }
        }

        TweenMax.set($('body'), {
            scrollTop: "+=" + this.scrollDelta
        });

        this.scrollDelta *= 0.9;
    }
}

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame || // comment out if FF4 is slow (it caps framerate at ~30fps: https://bugzilla.mozilla.org/show_bug.cgi?id=630127)
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

if (typeof define === 'function' && define.amd) {
    define('SmoothScroll', SmoothScroll);
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmoothScroll;
} else {
    window.SmoothScroll = SmoothScroll;
}