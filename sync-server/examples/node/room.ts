export default class PokerRoom {
    // Schema definition
    $schema = {
        users: [
            {
                id: Number,
                name: String,
                chips: Number,
                currentTime: Number,
                hand: [{
                    $syncWithClient: false
                }]
            }
        ],
        tableCards: [String],
        currentBet: Number,
        currentPlayerId: Number
    }

    users = {}
    deck: string[] = []
    aroundTable: string[] = [] // list of users Id
    tableCards = []
    currentBet = 0
    currentPlayerId = null
    timer: any = null
    timerDuration = 60

    pot = 0;  // To store the cumulative bets.
    currentRoundBet = 0;  // The current round's maximum bet.
    bettingRound = 0;  // 0: Pre-Flop, 1: Flop, 2: Turn, 3: River
    actionCount = 0;  // Keeps track of how many players have taken action in the current betting round

    $actions = {
        bet: true,
        fold: true
    }

    $additionalEmitProperties(player) {
        return [`users.${player.id}.hand`]
    }

    onJoin(player) {
        player.hand = [];
        player.chips = 1000;
        this.aroundTable.push(player.id);

        if (Object.keys(this.users).length === 2) {
            this.startGame();
        }
    }


    onLeave(player: any) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.aroundTable = this.aroundTable.filter(id => id !== player.id);
    }

    startGame() {
        this.shuffleDeck();
        this.deal();
        this.startTurn(this.aroundTable[0]);
    }

    startTurn(playerId: any) {
        this.currentPlayerId = playerId;
        this.users[playerId].currentTime = this.timerDuration;

        // Reset or start the timer
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            const currentTime = this.users[playerId].currentTime
            this.users[playerId].currentTime--
            if (currentTime <= 0) {
                this.endTurn()
            }
        }, 1000);
    }

    revealTableCards() {
        const cardsToReveal = {
            0: 3, // Flop
            3: 1, // Turn
            4: 1  // River
        };

        const numberOfCardsToReveal = cardsToReveal[this.tableCards.length];
        if (numberOfCardsToReveal) {
            for (let i = 0; i < numberOfCardsToReveal; i++) {
                this.tableCards.push(this.drawCard());
            }
        }
    }

    endTurn() {
        clearInterval(this.timer);
    
        this.actionCount++;
    
        // If every player has taken action, end the betting round
        if (this.actionCount >= this.aroundTable.length) {
            this.endBettingRound();
            return;
        }
    
        // Else, continue to the next player
        const currentPlayerIndex = this.aroundTable.findIndex(id => id === this.currentPlayerId);
        const nextPlayerIndex = (currentPlayerIndex + 1) % this.aroundTable.length;
        this.startTurn(this.aroundTable[nextPlayerIndex]);
    }

    endBettingRound() {
        this.actionCount = 0;  // Reset action count
        this.bettingRound++;  // Move to the next betting round
    
        switch (this.bettingRound) {
            case 1: // Flop
            case 2: // Turn
            case 3: // River
                this.revealTableCards();
                break;
            case 4: // End of game after River
                this.determineWinner();
                break;
            default:
                console.error("Invalid betting round.");
        }
    }
    

    bet(player, amount) {
        const userId = player.id;
        if (userId !== this.currentPlayerId) {
            console.error('It is not this player\'s turn to act.');
            return;
        }

        if (player.chips >= amount && amount >= this.currentRoundBet) {
            const difference = amount - this.currentRoundBet;
            this.currentBet += difference;
            player.chips -= difference;

            this.pot += difference;
            this.currentRoundBet = amount;

            this.endTurn();
        } else {
            console.error('Insufficient chips or bet amount is too low.');
        }
    }

    call(player) {
        const userId = player.id;
        if (userId !== this.currentPlayerId) {
            console.error('It is not this player\'s turn to act.');
            return;
        }

        const difference = this.currentRoundBet - player.currentBet;
        if (player.chips >= difference) {
            player.chips -= difference;
            this.pot += difference;
            player.currentBet = this.currentRoundBet;

            this.endTurn();
        } else {
            console.error('Insufficient chips to call.');
        }
    }

    check(player) {
        const userId = player.id;
        if (userId !== this.currentPlayerId) {
            console.error('It is not this player\'s turn to act.');
            return;
        }

        if (player.currentBet < this.currentRoundBet) {
            console.error('Can\'t check. Current bet is less than the table bet.');
            return;
        }

        this.endTurn();
    }

    determineWinner() {
        // In a real poker game, you would need to evaluate hands and compare them 
        // to find out the best hand. This would involve a hand ranking system.
    
        // Here, let's assume we find the winner and declare:
        const winner = this.evaluateHands();
        console.log(`Player ${winner.name} wins with ${winner.hand}!`);
    }
    
    evaluateHands() {
        // Placeholder - Actual hand evaluation logic goes here
        // Return the player with the best hand
        return this.users[this.aroundTable[0]];  // For now, just return the first player as a placeholder
    }

    fold(player) {
        const userId = player.id;

        if (userId !== this.currentPlayerId) {
            console.error('It is not this player\'s turn to act.');
            return;
        }

        if (player) {
            player.hand = [];
            this.endTurn();
        }
    }

    deal() {
        for (let user of Object.values(this.users)) {
            user.hand.push(this.drawCard());
            user.hand.push(this.drawCard());
        }
    }

    drawCard() {
        return this.deck.pop();
    }

    shuffleDeck() {
        const suits = ['♠', '♣', '♥', '♦'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.deck = [];
        for (let suit of suits) {
            for (let value of values) {
                this.deck.push(value + suit);
            }
        }
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
}
