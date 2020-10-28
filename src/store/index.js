import { createStore } from 'vuex'

export default createStore({
  state () {
      return {
          cardList: [],
          selectedList: [],
      }
  },
  mutations: {
      add(state, payload) {
          state.cardList[payload] = [];
          // console.log(state.cardList[payload], payload);
      },
      push(state, payload) {
          state.cardList[payload.index].push(...payload.list);
      },
      delete(state, payload) {
          state.cardList[0] = state.cardList[0].filter(card => payload.indexOf(card.index) < 0);
          // console.log('aft', state.cardList[0], payload);
      },
      replace(state, payload) {
        state.selectedList = payload;
      }
  }
})
