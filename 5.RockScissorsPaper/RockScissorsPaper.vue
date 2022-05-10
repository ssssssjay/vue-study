<template>
  <div>
    <div id="computer" :style="comutedStyleObject"></div>
    <button @click="onClickButton('바위')">바위</button>
    <button @click="onClickButton('가위')">가위</button>
    <button @click="onClickButton('보')">보</button>
    <div>{{ result }}</div>
    <div>{{ score }}</div>
  </div>
</template>

<script>
  const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
  }
  export default {
    data() {
      return {
        result: '게임을 시작하세요',
        score: 0,
        imgCoord: rspCoords.바위,
      }
    },
    computed: {
      comutedStyleObject() {
        return {
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
        };
      },
    },
    methods: {
      changeHand() {
        console.log('change Hand~!!');
        interval = setInterval(() => {
          if (this.imgCoord === rspCoords.바위) {
            this.imgCoord = rspCoords.가위;
          } else if (this.imgCoord === rspCoords.가위) {
            this.imgCoord = rspCoords.보;
          } else if (this.imgCoord === rspCoords.보) {
            this.imgCoord = rspCoords.바위;
          }
        } , 100)
      },
      onClickButton(pick) {
        clearInterval(interval);
        console.log(pick);
      }
    },
    beforeCreate() {
      console.log('beforeCreate');
    },
    created() {
      console.log('created');
    },
    beforeMount() {
      console.log('beforeMount');
    },
    mounted() {
      console.log('mounted');
      this.changeHand();
    },
    beforeUpdate() {
      console.log('beforeUpdate');
    },
    updated() {
      console.log('updated');
    },
    beforeDestroy() {
      console.log('beforeDestroy');
      clearInterval(interval);
    },
    destroyed() {
      console.log('destroyed');
    },
  };
</script>

<style sccoped>
  #computer {
    width: 142px;
    height: 200px;
    background-position: 0 0;
  }
</style>