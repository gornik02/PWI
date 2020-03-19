
let cards = ["apple.png", "orange.png", "pear.png", "pear.png", "plum.png", "apple.png", "orange.png", "bananas.png", "plum.png", "strawberry.png", "bananas.png", "strawberry.png"];

const playingCards = getRandomCards();

let c0 = document.getElementById('c0');
let c1 = document.getElementById('c1');
let c2 = document.getElementById('c2');
let c3 = document.getElementById('c3');

let c4 = document.getElementById('c4');
let c5 = document.getElementById('c5');
let c6 = document.getElementById('c6');
let c7 = document.getElementById('c7');

let c8 = document.getElementById('c8');
let c9 = document.getElementById('c9');
let c10 = document.getElementById('c10');
let c11 = document.getElementById('c11');

c0.addEventListener("click", function() { revealCard(0); });
c1.addEventListener("click", function() { revealCard(1); });
c2.addEventListener("click", function() { revealCard(2); });
c3.addEventListener("click", function() { revealCard(3); });

c4.addEventListener("click", function() { revealCard(4); });
c5.addEventListener("click", function() { revealCard(5); });
c6.addEventListener("click", function() { revealCard(6); });
c7.addEventListener("click", function() { revealCard(7); });

c8.addEventListener("click", function() { revealCard(8); });
c9.addEventListener("click", function() { revealCard(9); });
c10.addEventListener("click", function() { revealCard(10); });
c11.addEventListener("click", function() { revealCard(11); });

let oneVisible = false;
let turnCounter = 0;
let visible_nr;
let lock = false;
let pairsLeft = 6;

function getRandomCards() {
	const cardsArray = [];
	while(cards.length !== 0) {
		const randomInt = getRandomInt(cards.length);
		const randomCard = cards[randomInt];
		cardsArray.push(randomCard);
		cards.splice(randomInt, 1);
	}
	return cardsArray;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function revealCard(nr)
{
	const element = document.getElementById(`c${nr}`);
	const style = window.getComputedStyle(element);
    const opacityValue = style.getPropertyValue('opacity');
	
	if (opacityValue != 0 && lock == false)
	{
		lock = true;
	
		let obraz = "url(img/" + playingCards[nr] + ")";

		element.style.setProperty('background-image', obraz);
		element.setAttribute('class', 'cardA');
		
		if(oneVisible == false)
		{
			element.style.setProperty('pointer-events', 'none');
			oneVisible = true;
			visible_nr = nr;
			lock = false;
		}
		else
		{
			
			if(playingCards[visible_nr] == playingCards[nr])
			{
				
				setTimeout(function() { hide2Cards(nr, visible_nr) }, 750);
				
			}
			else
			{
				
				setTimeout(function() { restore2Cards(nr, visible_nr) }, 1000);
			}
			
			turnCounter++;
			document.getElementById('score').innerHTML = 'Turn counter: '+ turnCounter;
			oneVisible = false;
		}
		
	}
	
}

function hide2Cards(nr1, nr2)
{
	const element1 = document.getElementById(`c${nr1}`);
	element1.style.setProperty('opacity', '0');

	const element2 = document.getElementById(`c${nr2}`);
	element2.style.setProperty('opacity', '0');
	
	pairsLeft--;
	
	if(pairsLeft == 0)
	{
		document.getElementById('board').innerHTML = `<h1>You win!<br>Done in ${turnCounter} turns</h1>`;
	}
	
	lock = false;
}

function restore2Cards(nr1, nr2)
{
	const element1 = document.getElementById(`c${nr1}`);
	element1.style.setProperty('background-image', 'url(img/card.png)');
	element1.style.setProperty('pointer-events', 'auto');
	element1.setAttribute('class', 'card');

	const element2 = document.getElementById(`c${nr2}`);
	element2.style.setProperty('background-image', 'url(img/card.png)');
	element2.style.setProperty('pointer-events', 'auto');
	element2.setAttribute('class', 'card');

	lock = false;
}

