<template>
  <div>
    我是首页
    <!-- 有多个编辑器，就用类名的话，mathjax集成就会为空，用v-if的方式切换页面也会为空 需要加上不同的id唯一值  光用id就会出现页面需要刷新一次才能渲染，最好的使用方式就是用class做初始化，用id来做唯一的识别，About.vue也可以作为组件，需要配置自带的代码就直接搜查配置详情，直接用cdn的方式引入，就不用一一的引入了，有些核心菜单自带的有，需要注意的是配置图片上传预览image的话，需要 images_upload_url 这个值是上传的路径              这里是jq+vue+tinymce+mathjax-->
    <textarea class="myinput" rows="20" cols="10"></textarea>
    <textarea class="myinput" rows="20" cols="10"></textarea>
    <textarea class="myinput" rows="20" cols="10"></textarea>

    <h1>我要看你能不能渲染进去</h1>
    <!-- 测试看mathjax能渲染进去不 -->
    <div>
      \begin{equation}
      E = mc^2
      \end{equation}
      Equation*:
      \begin{equation*}
      E = mc^2
      \end{equation*}
    </div>
    <div></div>
    <Mathjax :value="this.content"></Mathjax>
    <Teat :visible.sync="open"></Teat>
    <!-- 手写数学公式 -->
    <div class="Handwritten" v-if="writtenMathematical ">
      <h3 class="title">
        <p>手写公式</p>
        <p class="close" @click="writtenMathematical=false">x</p>
      </h3>
      <iframe
        width="100%"
        height="669px"
        src="https://webdemo.myscript.com/views/math/index.html"
        frameborder="0"
      ></iframe>
    </div>
    <!-- 几何图形 -->
    <div class="Handwritten" v-if="Geometry ">
      <h3 class="title">
        <p>几何图形</p>
        <p class="close" @click="Geometry=false">x</p>
      </h3>
      <iframe
        width="100%"
        height="669px"
        src="https://webdemo.myscript.com/views/diagram/index.html#/edit"
        frameborder="0"
      ></iframe>
    </div>
    <!-- <input type="file" accept="image/*" @change='upload'> -->
    <!--     <div style=" font-family:Verdana; font-size:12px; text-align:center;  line-height:30px;">
      <form id="form1"  >
     <br /><br /><br />
     <input type="file" id="f"    />
        <br /><br />
 <button ID="Button1"  class="btn btn-primary btn-sm" 
    onclick="Button1_Click">上传</button> <br />-->
    <!--  </form>
    </div>-->
    <!-- <div id="bg" :style="'background-image:url('+ img +')'"></div> -->
    <!-- <img v-if='img' :src="img" alt="" > -->
    <!-- <input type="file" accept="image/*" @change="upload" /> -->
  </div>
</template>

<script>
import Teat from "@/views/Teat.vue";
// import moduleName from 'module'
import "@/js/uploadimage.js";
import Mathjax from "@/views/Mathjax.vue";
export default {
  components: {
    Teat,
    Mathjax
  },
  data() {
    return {
      open: false,
      upload_image_url: "/Teat",
      img: "",
      writtenMathematical: false,
      Geometry: false,
      content: {
        Question: {
          body: "数学测试：a^2 + b^2 = \\dfrac{c}{d}"
        }
      }
    };
  },
  created() {
    window.MathJax = {
      startup: {
        pageReady: () => {
          // alert(111) // 检验脚本首次是否加载成功
          return window.MathJax.startup.defaultPageReady();
        }
      },
      tags: "all", // 为方程式编号
      tagSide: "left", // 方程式编号的位置
      tex: {
        processEscapes: true,
        processEnvironments: true, // process \begin{xxx}...\end{xxx} outside math mode
        processRefs: true, // process \ref{...} outside of math mode
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"]
        ],
        displayMath: [
          // start/end delimiter pairs for display math
          ["$$", "$$"],
          ["\\[", "\\]"]
        ]
      }
    };
  },
  mounted() {
    let than = this;
    window.tinymce.init({
      selector: ".myinput",
      // external_plugins: { 'mathjax': '../../Math/tinymce/js/tinymce/plugins/mathjax/plugin.min.js' },
      // external_plugins: { 'mathjax': require('@/tinymce/js/tinymce/plugins/mathjax/edit.js') },
      //自带的库没得用，在网上引入的库就行了
      mathjax: {
        lib: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js",
        symbols: { start: "\\(", end: "\\)" }
      },
      width: 1000,
      height: 300,
      plugins: " charmap code table uploadimage",
      toolbar:
        "bold italic underline strikethrough forecolor  | table |  charmap  | mathjax mathsymbol |   sx  jh      | code  pic | link unlink  uploadimage",
      menubar: false,
      images_upload_url: "/",
      setup: function(editor) {
        //自定义菜单配置按钮
        // uploadImage(editor)
        /* 逻辑代码  为了后面的config加载器 代码*/
        var url = require("@/tinymce/js/tinymce/plugins/mathjax");
        let mathjaxClassName = editor.settings.mathjax.className || "math-tex";
        let mathjaxTempClassName = mathjaxClassName + "-original";
        var mathjaxSymbols = editor.settings.mathjax.symbols || {
          start: "\\(",
          end: "\\) "
        };
        let mathjaxUrl = editor.settings.mathjax.lib || null;
        let mathjaxConfigUrl =
          (editor.settings.mathjax.configUrl || url + "/config.js") +
          "?class=" +
          mathjaxTempClassName;
        let mathjaxScripts = [mathjaxConfigUrl];
        if (mathjaxUrl) {
          mathjaxScripts.push(mathjaxUrl);
        }
        editor.on("init", function() {
          for (let i = 0; i < mathjaxScripts.length; i++) {
            let id = editor.dom.uniqueId();
            let script = editor.dom.create("script", {
              id: id,
              type: "text/javascript",
              src: mathjaxScripts[i]
            });
            editor
              .getDoc()
              .getElementsByTagName("head")[0]
              .appendChild(script);
          }
        });

        editor.on("GetContent", function(e) {
          let div = editor.dom.create("div");
          div.innerHTML = e.content;
          let elements = div.querySelectorAll("." + mathjaxClassName);
          for (let i = 0; i < elements.length; i++) {
            let children = elements[i].querySelectorAll("span");
            for (let j = 0; j < children.length; j++) {
              children[j].remove();
            }
            let latex = elements[i].getAttribute("data-latex");
            elements[i].removeAttribute("contenteditable");
            elements[i].removeAttribute("style");
            elements[i].removeAttribute("data-latex");
            elements[i].innerHTML = latex;
          }
          e.content = div.innerHTML;
        });
        let checkElement = function(element) {
          if (element.childNodes.length != 2) {
            element.setAttribute("contenteditable", false);
            element.style.cursor = "pointer";
            let latex = element.getAttribute("data-latex") || element.innerHTML;
            element.setAttribute("data-latex", latex);
            element.innerHTML = "";
            let math = editor.dom.create("span");
            math.innerHTML = latex;
            math.classList.add(mathjaxTempClassName);
            element.appendChild(math);
            let dummy = editor.dom.create("span");
            dummy.classList.add("dummy");
            dummy.innerHTML = "dummy";
            dummy.setAttribute("hidden", "hidden");
            element.appendChild(dummy);
          }
        };
        editor.on("BeforeSetContent", function(e) {
          let div = editor.dom.create("div");
          div.innerHTML = e.content;
          let elements = div.querySelectorAll("." + mathjaxClassName);
          for (let i = 0; i < elements.length; i++) {
            checkElement(elements[i]);
          }
          e.content = div.innerHTML;
        });
        editor.on("SetContent", function(e) {
          console.log(e);

          if (editor.getDoc().defaultView.MathJax) {
            editor.getDoc().defaultView.MathJax.startup.getComponents();
            editor.getDoc().defaultView.MathJax.typeset();
          }
        });
        editor.on("click", function(e) {
          let closest = e.target.closest("." + mathjaxClassName);
          if (closest) {
            openMathjaxEditor(closest);
          }
        });
        editor.ui.registry.addButton("mathsymbol", {
          text: "LaTex符号",
          onAction: function() {
            than.open = true;
            console.log("5479689");
          }
        });
        editor.ui.registry.addButton("sx", {
          text: "手写公式",
          onAction: function() {
            than.writtenMathematical = true;
            // console.log("5479689");
          }
        });
        editor.ui.registry.addButton("jh", {
          text: "几何图形",
          onAction: function() {
            than.Geometry = true;
            // console.log("5479689");
          }
        });
        editor.ui.registry.addButton("mathjax", {
          text: "数学公式",
          tooltip: "Mathjax",
          onAction: function() {
            openMathjaxEditor();
          }
        });
        let openMathjaxEditor = function(target) {
          let mathjaxId = editor.dom.uniqueId();
          let latex = "";
          if (target) {
            var latex_attribute = target.getAttribute("data-latex");
            if (
              latex_attribute.length >=
              (mathjaxSymbols.start + mathjaxSymbols.end).length
            ) {
              latex = latex_attribute.substr(
                mathjaxSymbols.start.length,
                latex_attribute.length -
                  (mathjaxSymbols.start + mathjaxSymbols.end).length
              );
            }
          }
          editor.windowManager.open({
            title: "Mathjax",
            width: 600,
            height: 330,
            body: {
              type: "panel",
              items: [
                {
                  type: "textarea",
                  name: "title"
                },
                {
                  type: "htmlpanel",
                  html:
                    '<iframe id="' +
                    mathjaxId +
                    '" style="width: 100%; min-height: 50px;"></iframe>'
                }
              ]
            },
            buttons: [
              {
                type: "submit",
                text: "OK"
              }
            ],
            onSubmit: function onsubmit(api) {
              let value = api.getData().title.trim();
              if (target) {
                console.log("目标值" + target);

                target.innerHTML = "";
                target.setAttribute("data-latex", getMathText(value));
                checkElement(target);
                console.log(target);
              } else {
                let newElement = editor.getDoc().createElement("span");
                newElement.innerHTML = getMathText(value);
                newElement.classList.add(mathjaxClassName);
                checkElement(newElement);
                editor.insertContent(newElement.outerHTML);
              }
              editor.getDoc().defaultView.MathJax.startup.getComponents();
              editor.getDoc().defaultView.MathJax.typeset();
              api.close();
            },
            // onChange: function(api) {
            //   var value = api.getData().title.trim();
            //   if (value != latex) {
            //     refreshDialogMathjax(value, document.getElementById(mathjaxId));
            //     latex = value;
            //   }
            // },
            initialData: {
              title: latex
            }
          });
          console.log(mathjaxSymbols);
          let iframe = document.getElementById(mathjaxId);
          let iframeWindow =
            iframe.contentWindow ||
            iframe.contentDocument.document ||
            iframe.contentDocument;
          let iframeDocument = iframeWindow.document;
          let iframeHead = iframeDocument.getElementsByTagName("head")[0];
          let iframeBody = iframeDocument.getElementsByTagName("body")[0];
          let getMathText = function(value, symbols) {
            if (!symbols) {
              symbols = mathjaxSymbols;
            }
            return symbols.start + " " + value + " " + symbols.end;
          };
          let refreshDialogMathjax = function(latex) {
            let MathJax = iframeWindow.MathJax;
            let div = iframeBody.querySelector("div");
            if (!div) {
              div = iframeDocument.createElement("div");
              div.classList.add(mathjaxTempClassName);
              iframeBody.appendChild(div);
            }
            div.innerHTML = getMathText(latex, {
              start: "$$",
              end: "$$"
            });
            if (MathJax && MathJax.startup) {
              MathJax.startup.getComponents();
              MathJax.typeset();
            }
          };
          refreshDialogMathjax(latex);
          for (let i = 0; i < mathjaxScripts.length; i++) {
            let node = iframeWindow.document.createElement("script");
            node.src = mathjaxScripts[i];
            node.type = "text/javascript";
            node.async = false;
            node.charset = "utf-8";
            iframeHead.appendChild(node);
          }
        };
      }
    });
  },
  methods: {
    //   upload(e) {
    // let that  = this
    // let file = e.target.files[0]
    // if(file) {
    //   if (!/image\/\w+/.test(file.type)) {
    //     alert("请确保文件为图像类型")
    //     return false;
    //   }
    //   // 图片预览 存在裁剪问题
    //   //const formData = new FormData()
    //   //formData.append('file', file)
    //   //axios(url,[,config]).then().catch()
    //   const reader = new FileReader()
    //   reader.readAsDataURL(file)
    //   reader.onload = function() {
    //     //console.log(this.result)
    //     that.img = this.result
    // let base64 = this.result
    /* let data = {
        order_id,
        base64
      } */
    /*    axios(`${baseUrl}/order/xxxxxx/`, {
        method: 'post',
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          'Accept': 'application/json'
        },
        data:qs.stringify(data),
        withCredentials: true
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      }) */
    //     }
    //   }
    // },
  }
};
</script>

<style lang="less" scoped>
.Handwritten {
  width: 45%;
  position: absolute;
  border: 1px solid #ddd;
  top: 20%;
  left: 33%;
  background: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #ccc;
    .close {
      font-size: 30px;
      cursor: pointer;
    }
  }
}
</style>