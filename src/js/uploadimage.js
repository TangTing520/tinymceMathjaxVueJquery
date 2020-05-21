(function () {
  var reader = new FileReader();
  console.log(reader);


  'use strict';
  var global = window.tinymce.util.Tools.resolve('tinymce.PluginManager');
  function selectLocalImages(editor) {
    var uploadurl = editor.getParam('images_upload_url', '', 'string');
    var dom = editor.dom;

    var input_f = window.$('<input type="file" name="Filedata[]" accept="image/jpg,image/jpeg,image/png,image/gif" multiple="multiple">');
    input_f.on('change', function () {
      // console.log("dom嘛"+JSON.stringify(input_f) );

      var form = window.$("<form/>", {
        action: uploadurl, //设置上传图片的路由，配置在初始化时
        style: 'display:none',
        method: 'get',
        enctype: 'multipart/form-data'
      });
      form.append(input_f);
      console.log(form);

      console.log(form[0][0].value);
      console.log(form[0][0].files[0]);

      editor.focus();
      editor.selection.setContent(dom.createHTML('img', {
        src: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg'
      }));
      //图片列表
      console.log(reader.readAsDataURL(form[0][0].files[0]));

      //ajax提交表单
      // form.ajaxSubmit({
      //   beforeSubmit: function () {
      //     return true;
      //   },
      //   success: function (data) {
      //     console.log(data);

      //     editor.focus();
      //     var json = JSON.parse(data);
      //     json.forEach(function (row) {
      //       editor.selection.setContent(dom.createHTML('img', {
      //         src: row.path
      //       }));
      //     })
      //   }
      // });
    });

    input_f.click();
  }

  var register$1 = function (editor) {
    editor.ui.registry.addButton('uploadimage', {
      icon: 'image',
      tooltip: '上传图片',
      onAction: function () {
        selectLocalImages(editor)
      }
    });
    editor.ui.registry.addMenuItem('uploadimage', {
      icon: 'image',
      text: '上传图片',
      onAction: function () {
        selectLocalImages(editor)
      }
    });
  };
  var Buttons = {
    register: register$1
  };

  function Plugin() {
    global.add('uploadimage', function (editor) {
      Buttons.register(editor);
    });
  }
  Plugin();
}());