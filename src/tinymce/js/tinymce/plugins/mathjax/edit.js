/* var mathjaxSymbols;
var latex_attribute; */
/* console.log('进入');
console.log(window.tinymce.PluginManager.add); */
/* window.onload=function(){
    window.tinymce.setup=function (editor) {
        console.log(123456);
        
    console.log(editor);
    
        editor.ui.registry.addButton('mathjax', {
        text: '数学公式',
        tooltip: 'Mathjax',
        onAction: function () {
            // openMathjaxEditor();
    
           
        }
      });
    
    }


}
 */
/* 
window.tinymce.PluginManager.add=function(editor,url) {
  debugger
  // console.log(n);
  
// console.log(123456456);
console.log(editor,url); */


  // plugin configuration options
/*   let mathjaxClassName = editor.settings.mathjax.className || "math-tex";
  let mathjaxTempClassName = mathjaxClassName + '-original';


  mathjaxSymbols = editor.settings.mathjax.symbols || { start: '\\(', end: '\\) ' };


  let mathjaxUrl = editor.settings.mathjax.lib || null;
  let mathjaxConfigUrl = (editor.settings.mathjax.configUrl || url + '/config.js') + '?class=' + mathjaxTempClassName;
  let mathjaxScripts = [mathjaxConfigUrl];
  if (mathjaxUrl) {
    mathjaxScripts.push(mathjaxUrl);
  }

  // load mathjax and its config on editor init
  editor.on('init', function () {
    for (let i = 0; i < mathjaxScripts.length; i++) {
      let id = editor.dom.uniqueId();
      let script = editor.dom.create('script', {id: id, type: 'text/javascript', src: mathjaxScripts[i]});
      editor.getDoc().getElementsByTagName('head')[0].appendChild(script); 
    }
  });
 */
  // remove extra tags on get content
/*   editor.on('GetContent', function (e) {
    console.log(e);
    
    let div = editor.dom.create('div');
    div.innerHTML = e.content;
    let elements = div.querySelectorAll('.' + mathjaxClassName);
    for (let i = 0; i < elements.length; i++) {
      let children = elements[i].querySelectorAll('span');
      for (let j = 0; j < children.length; j++) {
        children[j].remove();
      }
      let latex = elements[i].getAttribute('data-latex');
      elements[i].removeAttribute('contenteditable');
      elements[i].removeAttribute('style');
      elements[i].removeAttribute('data-latex');
      elements[i].innerHTML = latex;
    }
    e.content = div.innerHTML;
  }); */

/*   let checkElement = function(element) {
    if (element.childNodes.length != 2) {
      element.setAttribute('contenteditable', false);
      element.style.cursor = 'pointer';
      let latex = element.getAttribute('data-latex') || element.innerHTML;
      element.setAttribute('data-latex', latex);
      element.innerHTML = '';

      let math = editor.dom.create('span');
      math.innerHTML = latex;
      math.classList.add(mathjaxTempClassName);
      element.appendChild(math);

      let dummy = editor.dom.create('span');
      dummy.classList.add('dummy');
      dummy.innerHTML = 'dummy';
      dummy.setAttribute('hidden', 'hidden');
      element.appendChild(dummy);
    }
  }; */

  // add dummy tag on set content
/*   editor.on('BeforeSetContent', function (e) {
    let div = editor.dom.create('div');
    div.innerHTML = e.content;
    let elements = div.querySelectorAll('.' + mathjaxClassName);
    for (let i = 0 ; i < elements.length; i++) {
      checkElement(elements[i]);
    }
    e.content = div.innerHTML;
       
  }); */

/*   // refresh mathjax on set content
  editor.on('SetContent', function(e) {
    console.log(e);
    
    if (editor.getDoc().defaultView.MathJax) {
      editor.getDoc().defaultView.MathJax.startup.getComponents();
      editor.getDoc().defaultView.MathJax.typeset(); 
    }
  }); */

  // add button to tinimce
  /* editor.ui.registry.addButton('mathjax', {
    text: '数学公式',
    tooltip: 'Mathjax',
    onAction: function () {
        // openMathjaxEditor();

       
    }
  }); */



// }



/* function changesybol() {
    if (document.getElementById("cb_br").checked) {
        mathjaxSymbols = { start: '\\[', end: '\\] ' };
    }
    else {
        mathjaxSymbols = { start: '\\(', end: '\\) ' };
    }


}
changesybol() */