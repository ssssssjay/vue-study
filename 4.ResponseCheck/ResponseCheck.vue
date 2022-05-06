<template>
  <div>
    <h1>반응속도체크게임</h1>
    <div id="screen" v-bind:class="state" @click="onClickScreen">{{ message }}</div>
    <div v-show="result.length">
      <!-- <div>Response Time Average : {{ result.reduce((a, c) => a + c , 0) / result.length || 0 }}ms</div> -->
      <div>Response Time Average : {{ average }}ms</div>
      <button @click="onReset">기록초기화</button>
    </div>
  </div>
</template>

<script>
  let startTime = 0;
  let endTime = 0;
  let timeout = null;
  export default {
    data() {
      return {
        result: [],
        state: 'waiting',
        message : '클릭해서 시작하세요'
      }
    },
    computed: {
      average() {
        return this.result.reduce((a, c) => a + c , 0) / this.result.length || 0
      }
    },
    methods: {
      onReset() {
        this.result = []
      },
      onClickScreen() {
        console.log('test');
        if (this.state === 'waiting') {
          this.state = 'ready';
          this.message = '초록색으로 스크린이 변하면 클릭하세요!';
          timeout = setTimeout(() => {
            startTime = new Date();
            this.state = 'now';
            this.message = '지금입니다. 클릭하세요!'
          }, Math.floor(Math.random() * 1000) + 2000);
        } else if (this.state === 'ready') {
          clearTimeout(timeout)
          this.state = 'waiting';
          this.message = '너무 급하게 클릭했습니다.'
        } else if (this.state === 'now') {
          endTime = new Date();
          this.state = 'waiting';
          this.message = '클릭해서 시작하세요';
          this.result.push(endTime - startTime);
        }
      }
    }
  };
</script>

<style sccoped>
  #screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
  }
  #screen.waiting {
    background-color: aqua;
  }
  #screen.ready {
    background-color: red;
    color: white;
  }
  #screen.now {
    background-color: greenyellow;
  }
</style>