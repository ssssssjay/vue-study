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
  };

  const scores = {
    바위: 0,
    가위: 1,
    보: -1,
  };

  const computerPick = (imgCoord) => {
    return Object.entries(rspCoords).find(el => {
      return el[1] === imgCoord;
    })[0];
  };

  let interval = null;
  
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
        const myScore = scores[pick];
        const cpuScore = scores[computerPick(this.imgCoord)]
        const diff = myScore - cpuScore;
        if (diff === 0) {
          this.result = '비겼습니다.';
        } else if ([-1, 2].includes(diff)) {
          this.result = '이겼습니다.';
          this.score += 1;
        } else {
          this.result = '졌습니다.';
          this.score -= 1;
        }
        setTimeout(() => {
          this.changeHand();
        }, 1500);
      },
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