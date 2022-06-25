import Vue from 'vue';
import Vuex from  'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
};

const plantMine = (row, col, mine) => {
  console.log(row, col, mine);
  const candidate = Array( row * col ).fill().map((data, i) => {return i}); // 총 셀 갯수만큼 담긴 1차원배열
  const shuffle = []; // 마인 위치 인덱스를 담은 1차원배열
  while (candidate.length > row * col - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  // const data = [];
  // for (let i = 0; i < row; i++) {
  //   const rowData = [];
  //   data.push(rowData);
  //   for (let j = 0; j < col; j++) {
  //     rowData.push(CODE.NORMAL);
  //   }
  // }
  const data = []; // 실제 마인 위치까지 담긴 2차원 배열 [[], [], ... , []]
  for (let i = 0; i < row; i++) {
    const rowData = [];
    for (let j = 0; j < col; j++) {
      rowData.push(CODE.NORMAL);
    }
    data.push(rowData);
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / col);
    const hor = shuffle[k] % col;
    data[ver][hor] = CODE.MINE;
  }


  console.log(data);
  return data;
};

export default new Vuex.Store({
  state: {
    tableData: [],
    data: {
      row: 0,
      col: 0,
      mine: 0
    },
    timer: 0,
    halted: true, // 게임이 처음엔 중단이 된 상태임
    result: ''
  }, // vue의 data와 느낌비슷
  getters: {}, // vue의 computed와 느낌비슷
  mutations: {
    // [START_GAME](state, data) {}, 이게 기본구조인데 쏴줄때 3개를 한번에 쏴주는 구조이고, 그걸 구조분해할당해버림
    [START_GAME](state, { row, col, mine }) {
      state.data = {
        row,
        col,
        mine
      };
      state.tableData = plantMine(row, col, mine);
      state.timer = 0;
      state.halted = false;
    },
    [OPEN_CELL](state, { row, col }) {
      // Vue.set(state.tableData[row], col, CODE.OPENED);
      Vue.set(state.tableData[row], col, CODE.OPENED);
    },
    [CLICK_MINE](state) {},
    [FLAG_CELL](state, { row, col }) {
      if (state.tableData[row][col] === CODE.MINE) {
        Vue.set(state.tableData[row], col, CODE.FLAG_MINE);
      } else {
        Vue.set(state.tableData[row], col, CODE.FLAG);
      }
    },
    [QUESTION_CELL](state, { row, col }) {
      if (state.tableData[row][col] === CODE.FLAG_MINE) {
        Vue.set(state.tableData[row], col, CODE.QUESTION_MINE);
      } else {
        Vue.set(state.tableData[row], col, CODE.QUESTION);
      }
    },
    [NORMALIZE_CELL](state, { row, col }) {
      if (state.tableData[row][col] === CODE.QUESTION_MINE) {
        Vue.set(state.tableData[row], col, CODE.MINE);
      } else {
        Vue.set(state.tableData[row], col, CODE.NORMAL);
      }
    },
    [INCREMENT_TIMER](state) {
      state.timer += 1;
    }
  }, // state를 동기적으로 수정할 때 반드시 뮤테이션스를 통해 바꿔야 함
  actions: {}, // 비동기를 사용할 때 또는 여러 뮤테이션스르르 연달아 실행할 때
});