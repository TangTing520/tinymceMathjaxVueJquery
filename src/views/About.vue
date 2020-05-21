<template>
  <div>
    <!-- 编辑器 -->
    <textarea id="aa" class="myinput" rows="20" cols="10"></textarea>
    <textarea id="bb" class="myinput" rows ="20" cols="10"></textarea>
    <textarea id="cc" class="myinput" rows ="20" cols="10"></textarea>
    <textarea id="dd" class="myinput" rows ="20" cols="10"></textarea>
    <textarea id="ff" class="myinput" rows ="20" cols="10"></textarea>
    <textarea id="ee" class="myinput" rows ="20" cols="10"></textarea>
    <textarea id="gg" class="myinput" rows ="20" cols="10"></textarea>
    <!-- <textarea  id="cc" class="bb" rows ="20" cols="10"></textarea> -->

    <!-- 数学符号 -->
    <Teat :visible.sync="open"></Teat>
    <!-- 手写数学公式 -->
    <div v-if="writtenMathematical " class="Handwritten">
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
    <div v-if="Geometry " class="Handwritten">
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
  </div>
  
</template>

<script>
import Teat from "@/views/Teat.vue";
// import moduleName from 'module'
import "@/js/uploadimage.js";
import plugs from '@/js/plugs.js'
// import '@/utils/math/zh_CN.js'  手动引入汉化包的方式，这个可以在网上下载
import  '@/js/zh_CN.js'
// import Teat from "@/views/Mathjax.vue";
export default {
  components: {
    Teat
  },
  data() {
    return {
      open: false,
      Geometry: false,
      writtenMathematical: false

    }
  },
  created () {
    window.MathJax = {
      startup: {
        pageReady: () => {
          // alert(111) // 检验脚本首次是否加载成功
          return window.MathJax.startup.defaultPageReady()
        }
      },
      tagSide: 'left', // 方程式编号的位置
      tex: {
        tags: 'all', // 为方程式编号
        processEscapes: true,
        processEnvironments: true, // process \begin{xxx}...\end{xxx} outside math mode
        processRefs: true, // process \ref{...} outside of math mode
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)']
        ],
        displayMath: [
          // start/end delimiter pairs for display math
          ['$$', '$$'],
          ['\\[', '\\]']
        ]
      }
    }
  },
  mounted () {
    //  window.MathJax.tex2chtmlPromise();
    let than=this
    window.tinymce.init({
      selector: '.myinput',
      mode : "textareas",
      //自带的库没得用，在网上引入的库就行了
      mathjax: {
        lib: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
        symbols: { start: '\\(', end: '\\)' },
        configUrl: '/static/config.js'//mathjax的config配置  不过我这里失败了，报错token“<”，但是不影响功能
      },
      language: 'zh_CN',//汉化，一般是自动加载，加载失败的话，就得自己去引入
      width: 1000,
      height: 300,
      plugins: ' charmap code table  uploadimage searchreplace template',
      toolbar:
        'bold italic underline strikethrough pagebreak imageoptions template forecolor  | table |  charmap  | mathjax mathsymbol |   sx  jh      | code  pic | uploadimage image searchreplace',
      menubar: false,
      images_upload_url: '/',
      url: '.',
      setup: function(editor) {
        //mathjax集成数学公式插件
        plugs(editor)
        editor.ui.registry.addButton('mathsymbol', {
          text: 'LaTex符号',
          onAction: function() {
            than.open=true
          }
        })
        editor.ui.registry.addButton('sx', {
          text: '手写公式',
          onAction: function() {
            than.writtenMathematical = true
          }
        })
        editor.ui.registry.addButton('jh', {
          text: '几何图形',
          onAction: function() {
            than.Geometry = true
          }
        })
      }
    })
   
    
  },
    
  methods: {
  }
}
</script>

<style lang="less" scoped>
.Handwritten {
    z-index: 9;
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
    padding: 2px 20px;
    background: #eee;
    .close {
      font-size: 30px;
      cursor: pointer;
    }
  }
}
</style>
