import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      turnSeat: "",
      cardList: [
        // { index: 0, num: 2, isSelected: false },
        // { index: 1, num: 2, isSelected: false },
        // { index: 2, num: 2, isSelected: false },
        // { index: 3, num: 2, isSelected: false },
        // { index: 4, num: 2, isSelected: false },
        // { index: 5, num: 2, isSelected: false },
        // { index: 6, num: 2, isSelected: false },
        // { index: 7, num: 2, isSelected: false },
        // { index: 8, num: 2, isSelected: false },
        // { index: 9, num: 2, isSelected: false },
        // { index: 10, num: 2, isSelected: false },
        // { index: 11, num: 2, isSelected: false },
        // { index: 12, num: 2, isSelected: false },
      ],
      playerStackMap: {},
      selectedIndexList: [],
      currentCard: [
        // { index: 0, num: 2, isSelected: false },
        // { index: 1, num: 2, isSelected: false },
        // { index: 2, num: 2, isSelected: false },
        // { index: 3, num: 2, isSelected: false },
        // { index: 4, num: 2, isSelected: false },
        // { index: 5, num: 2, isSelected: false },
        // { index: 6, num: 2, isSelected: false },
        // { index: 7, num: 2, isSelected: false },
        // { index: 8, num: 2, isSelected: false },
        // { index: 9, num: 2, isSelected: false },
        // { index: 10, num: 2, isSelected: false },
        // { index: 11, num: 2, isSelected: false },
        // { index: 12, num: 2, isSelected: false },
      ],
      myTurn: false,
      isLeader: false,
    }
  },
  mutations: {
    initPlayerStackMap(state, payload) {
      console.log('payload', payload)
      state.playerStackMap[payload.key] = payload
    },
    updatePlayerStackMap(state, payload) {
      state.playerStackMap[payload.key].splice(0, payload.count);
    },
    showPlayerStackMap(state, payload) {
      state.playerStackMap[payload.key] = payload.value;
    },
    setTurnSeat(state, payload) {
      state.turnSeat = payload;
    },
    setMyTurn(state, payload) {
      state.myTurn = payload;
    },
    setLeader(state, payload) {
      state.isLeader = payload;
    },
    init(state, payload) {
      state.cardList = payload;
    },
    add(state, payload) {
      state.selectedIndexList.push(payload);
    },
    removeIndex(state, payload) {
      state.selectedIndexList.splice(state.selectedIndexList.indexOf(payload), 1);
    },
    clearIndexList(state) {
      state.selectedIndexList = [];
    },
    delete(state, payload) {
      let indexList = payload.map(card => card.num);
      console.table(indexList);
      state.cardList = state.cardList.filter(card => indexList.indexOf(card.num) < 0);
    },
    selected(state, payload) {
      let card = state.cardList.filter(card => card.index === payload)[0];
      card.isSelected = !card.isSelected;
    },
    clear(state) {
      state.cardList.forEach(card => card.isSelected = false);
    },
    replace(state, payload) {
      state.currentCard = payload;
    }
  }
})
