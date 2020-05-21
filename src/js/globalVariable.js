let isMathjaxConfig = false;//用于标识是否配置
const initMathjaxConfig = () => {
    if (!window.MathJax) {
        return;
    }
    window.MathJax.Hub.Config({
        showProcessingMessages: false, //关闭js加载过程信息
        messageStyle: "none", //不显示信息
        jax: ["input/TeX", "output/HTML-CSS", "output/PreviewHTML"],
        tex: {
            tags: 'all',
            inlineMath: [["$", "$"], ["\\(", "\\)"]], //行内公式选择符
            displayMath: [["$$", "$$"], ["\\[", "\\]"]], //段内公式选择符
            skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "a"], //避开某些标签,
            packages: ["base", "newcommand", "action"]
        },
        "HTML-CSS": {
            availableFonts: ["STIX", "TeX"], //可选字体
            showMathMenu: false //关闭右击菜单显示
        }
    });
    isMathjaxConfig = true; //配置完成，改为true
};

const MathQueue = function (elementId) {
    if (!window.MathJax) {
        return;
    }
    window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, document.getElementById(elementId)]);
};
// var renderFormula = function(){
//     window.MathJax.Hub.Queue(function(){
//       var math = window.MathJax.Hub.getAllJax("MathDiv")[0];
//       window.MathJax.Hub.Queue(["Text", math, formula.value]);
//       location.hash = formula.value;
//     });
//   };
export default {
    MathQueue,
    isMathjaxConfig,
    initMathjaxConfig,
    // renderFormula
}