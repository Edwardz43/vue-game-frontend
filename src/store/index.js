import {createStore} from 'vuex';

export default createStore({
	state() {
		return {
			turnSeat: '',
			cardList: [],
			seatMap: {},
			flipSeatMap: {},
			playerStackMap: {},
			selectedIndexList: [],
			currentCard: [],
			myTurn: false,
			isLeader: false,
			ws: {},
		};
	},
	mutations: {
		conn(state, payload) {
			state.ws = payload;
		},
		disconn(state) {
			if (state.ws.close) {
				state.ws.close();
			}
		},
		init(state) {
			state.turnSeat = '';
			state.cardList = [];
			state.playerStackMap = {};
			state.seatMap = {};
			state.selectedIndexList = [];
			state.currentCard = [];
			state.myTurn = false;
			state.isLeader = false;
		},
		initPlayerStackMap(state, payload) {
			state.playerStackMap = payload;
		},
		updatePlayerStackMap(state, payload) {
			state.playerStackMap[payload.key].splice(0, payload.count);
		},
		showPlayerStackMap(state, payload) {
			state.playerStackMap = payload;
			console.log('state.playerStackMap', state.playerStackMap);
		},
		setSeatMap(state, payload) {
			state.seatMap = payload;
			let ret = {};
			Object.keys(payload).forEach(key => {
				ret[payload[key]] = key;
			});
			state.flipSeatMap = ret;
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
		initCardList(state, payload) {
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
});
