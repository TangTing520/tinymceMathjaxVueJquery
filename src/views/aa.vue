<!--组件说明：该组件使用场景为多项填写表单，内容为自定义，需传递的参数为:visible.sync，:no-save,类型为Boolean，初次打开传递true,no-save控制组件是否显示保存按钮，不传值默认显示，不显示传true，no-pulish控制组件是否显示发布按钮，默认不显示。保存按钮触发父组件事件需在引用处定义@save-but-->
<!--组件例子：<NewWindowpage :visible.sync="open" :no-save="true" :no-pulish="true"  @save-but="saveBut()">自定义内容</NewWindowpage>-->
<template>
  <div class="window-box" :class="visible?'animation-scale':''">
    <div class="custom-content-box">
      <slot></slot>
    </div>
    
    <div class="bottom-but-box">
      <el-button @click="close()">返回</el-button>
      <el-button v-if="!noSave" type="primary" @click="saveBut()">保存</el-button>
      <el-button v-if="noPulish" type="primary" @click="saveBut()">发布</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewWindowpage',
  props: {
    visible: {
      type: Boolean,
      required: false
    },
    noSave: {
      type: Boolean,
      required: false
    },
    noPulish: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {

    }
  },

  methods: {
    //关闭子页面
    close: function() {
      this.$emit('update:visible', false)
    },

    //触发父组件处理事件
    saveBut: function() {
      this.close()
      this.$emit('save-but')
    }
  }
}
</script>

<style lang="scss" scoped>
.window-box {
  position: absolute;
  z-index: 4;
  top: 0;
  margin: auto;
  width: 100%;
  height: calc(100vh - 84px);
  min-height: 100%;
  padding-top: 84px;
  background: #fff;
  transition: all 0.5s;
  transform: scale(0);
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  .custom-content-box {
    padding: 15px;
    // width: calc(100% + 13px);
    height: calc(100% - 60px);
    overflow-y: auto;
  }
  .bottom-but-box {
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 10px 10%;
    background: #eee;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
}


.animation-scale {
  transform: scale(1);
}
.custom-content-box::-webkit-scrollbar {
    display: none;
  }
</style>
