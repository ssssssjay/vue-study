<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent='onSubmitForm'>
      <input ref='answer' minlength="4" maxlength="4" v-model="value"/>
      <button>정답제출!</button>
    </form>
    <div>{{tries.length}}번째 시도</div>
    <ul>
      <li v-for="t in tries" v-bind:key="t.index">
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  const getNumbers = () => {
    const candidates = [1,2,3,4,5,6,7,8,9];
    const arr = [];
    for (let i = 0; i < 4; i++) {
      const pick = candidates.splice(Math.floor(Math.random() * (9 - i)) , 1)[0];
      arr.push(pick);
      console.log(arr);
      console.log(arr.join(''));
    }
    return arr;
  };

  export default {
    data() {
      return {
        answer: getNumbers(),
        tries: [],
        value: '',
        result: '',
      }
    },
    methods: {
      onSubmitForm(e) {
        // e.preventDefault();
        if (this.value === this.answer.join('')) {
          console.log('test for correct');
          this.tries.push(
            {
              try: this.value,
              result: '정답입니다. 홈런!'
            }
          );
        this.result = '홈런! 정답을 맞추어 새로운 게임을 시작합니다.';
        this.value = '';
        this.tries = [];
        this.answer = getNumbers();
        this.$refs.answer.focus();
        } else {
          if(this.tries.length >= 9) {
            this.result = '10번이나 틀렸어요! 다시 시작합니다.';
            this.value = '';
            this.tries = [];
            this.answer = getNumbers();
            this.$refs.answer.focus();
          } else {
            let strike = 0; // 자리까지 일치
            let ball = 0; // 숫자만 일치(포함)
            // this.answer [1,2,3,4]의 형태임 this.value도 형태를 똑같이 바꿔준다
            const submittedAnswerArray = this.value.split('').map(str => parseInt(str));
            console.log(submittedAnswerArray);
            console.log(this.answer);
            for(let i = 0; i < 4; i += 1) {
              if(submittedAnswerArray[i] === this.answer[i]) {
                strike++;
              } else if(this.answer.includes(submittedAnswerArray[i])) {
                ball++;
              }
            }
            this.tries.push(
              {
                try: this.value,
                result: `${strike} 스트라이크, ${ball} 볼 입니다.`
              }
            );
          }
          this.value = '';
          this.$refs.answer.focus();
        }
      }
    }
  };
</script>

<style>

</style>