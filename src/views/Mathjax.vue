<template>
    <div> 
       <div id="question-id">
            <div class="swappy-radios" >
                <div name="titleDiv">
                    <h3> jnbm题目：{{this.questionToOptions.Question.body}}</h3> <!-- //这里的questionToOptions.Question.body传入的就是Latex公式 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {}
        },
        data() {
            return {
                rawHtml:'',
                heightString: 'height: 500px;',
                questionToOptions: this.value,
                answer: '',
                imgIndex: 0,
            };
        },
        methods: {

        },
        watch: {
            //监听prop传的value，如果父级有变化了，将子组件的myValue也跟着变，达到父变子变的效果
            //这里看需求，若不使用监听，直接放在axios请求方法中也是可以的
            value(value) {
                // titleDiv
                this.questionToOptions = value;
                this.answer = '';
                this.$nextTick(function () { //这里要注意，使用$nextTick等组件数据渲染完之后再调用MathJax渲染方法，要不然会获取不到数据
                    if(this.commonsVariable.isMathjaxConfig){//判断是否初始配置，若无则配置。
                        this.commonsVariable.initMathjaxConfig();
                    }
                    this.commonsVariable.MathQueue("question-id");//传入组件id，让组件被MathJax渲染
                })
            },
            answer(newVal) {
                this.$emit('trouble', newVal)
            }
        },
        mounted() {
        }

    }
</script>