(function () {


	let deck = [];
	let dealer = [];
	let player = [];
	let dealerScore = 0
	let playerScore = 0

	let btnPlay = document.getElementById('btnPlay');
	let btnHit = document.getElementById('btnHit');
	let btnStay = document.getElementById('btnStay')
	let divDealerCards = document.getElementById('dealerCards')
	let divPlayerCards = document.getElementById('playerCards')
	let imgDealerCard1 = document.getElementById('dealerCard1')
	let imgDealerCard2 = document.getElementById('dealerCard2')
	let imgPlayerCard1 = document.getElementById('playerCard1')
	let imgPlayerCard2 = document.getElementById('playerCard2')
	let divWinner = document.getElementById('divWinner')

	btnPlay.addEventListener('click', play)
	btnHit.addEventListener('click', playerHit);
	btnStay.addEventListener('click', playerStand)
	btnReplay.addEventListener('click', replay)

	function replay(){
		dealer = []
		player = []
		deck = []
		divDealerCards.removeChild()
		play();

	}

	function play() {

		btnPlay.classList.add('hidden')
		btnHit.classList.remove('hidden')
		btnStay.classList.remove('hidden')
		divDealerCards.classList.remove('hidden')
		divPlayerCards.classList.remove('hidden')

		deck = getdeck();

		dealCard(player);
		dealCard(dealer);
		dealCard(player);
		dealCard(dealer);

		showCard(imgPlayerCard1, player[0]);
		showCard(imgPlayerCard2, player[1]);
		showCard(imgDealerCard1, dealer[0]);

		console.log('Deck: ', deck);
		console.log('Player ', player)
		console.log('Dealer ', dealer)
		
	}


	function dealCard(hand) {
		hand.push(deck.shift());
	}

	function playerHit() {

		dealCard(player);

		let card = player[player.length - 1];

		let newCardImg = document.createElement('img')
		newCardImg.classList.add('card');
		newCardImg.src = 'img/' + card + '.png'

		divPlayerCards.appendChild(newCardImg);

		playerScore = getHandScore(player)

		console.log('Score: ', getHandScore(player));

		if (playerScore > 21) {
			showWinner();
		}

	}

	function showWinner() {
		if (playerScore > 21) {
			divWinner.classList.add('bg-danger')
			divWinner.classList.remove('hidden');
			divWinner.innerHTML = '<h1>Busted! Dealer wins!</h1>'
		}
		else if (playerScore < 21) {
			divWinner.classList.add('bg-success')
			divWinner.classList.remove('hidden');
			divWinner.innerHTML = '<h1>Dealer busted! you win!</h1>'
		}
		else if (playerScore > dealerScore) {
			divWinner.classList.add('bg-success')
			divWinner.classList.remove('hidden');
			divWinner.innerHTML = '<h1>you Win!</h1>'
		}
		else if (playerScore === dealerScore) {
			divWinner.classList.add('bg-warning')
			divWinner.classList.remove('hidden');
			divWinner.innerHTML = '<h1>Its a Push!</h1>'
		}
		else{
			divWinner.classList.add('bg-danger')
			divWinner.classList.remove('hidden');
			divWinner.innerHTML = '<h1>Dealer Wins</h1>'
		}
		showCard(imgDealerCard2, dealer[0]);
		btnHit.classList.add('hidden')
		btnStay.classList.add('hidden')
		btnReplay.classList.remove('hidden')
	}

	function getdeck() {
	let deck = [
		'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
		'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
		'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
		'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
	];

	return shuffle(deck);
	}

	function showCard(img, card) {
		img.src = 'img/' + card + '.png'
	}

	function playerStand() {
		showCard(imgDealerCard2, dealer[1]);

		while (dealerScore <= 16){
			dealerHit();
		}
		showWinner();
	}

	function dealerHit(){
			
			dealCard(dealer);

		let card = dealer[dealer.length - 1];

		let newCardImg = document.createElement('img')
		newCardImg.classList.add('card');
		newCardImg.src = 'img/' + card + '.png'

		divDealerCards.appendChild(newCardImg);

		dealerScore = getHandScore(dealer)

		console.log('Score: ', getHandScore(dealer));

		if (playerScore > 21) {
			showWinner();
		}

	}

	function getHandScore(hand) {

        let score = 0;

        let nonAces = hand.filter(function (card) {
            return card[0] !== 'A';
        });

        let aces = hand.filter(function (card) {
            return card[0] === 'A';
        });

        nonAces.forEach(function (card) {
            card = card.replace(/H|C|D|S/, '');
            score += getCardScore(card, score);
        });

        aces.forEach(function (card) {
            card = card.replace(/H|C|D|S/, '');
            score += getCardScore(card, score);
        });

        return score;
    }

    function getCardScore(cardValue, currentScore) {

        switch (cardValue) {
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '10':
                return parseInt(cardValue);

            case 'J':
            case 'Q':
            case 'K':
                return 10;

            case 'A':
                return currentScore > 10 ? 1 : 11;
        }
    }


	function shuffle(array) {

		// Fisher–Yates Shuffle		
		// Source: https://bost.ocks.org/mike/shuffle/

		let m = array.length, t, i;

		// While there remain elements to shuffle…
		while (m) {

			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	};

})();