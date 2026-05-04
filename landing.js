/* landing.js — minimal interactions only */
(function () {
    'use strict';

    // Topic hover sounds (visual only — number lights up on hover)
    const topics = document.querySelectorAll('.lp-topic');
    topics.forEach(t => {
        t.addEventListener('mouseenter', () => {
            const num = t.querySelector('.lp-topic__n');
            if (num) num.style.color = '#C9A84C';
        });
        t.addEventListener('mouseleave', () => {
            const num = t.querySelector('.lp-topic__n');
            if (num) num.style.color = '';
        });
    });

})();
