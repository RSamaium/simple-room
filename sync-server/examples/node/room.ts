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

    endTurn() {
        clearInterval(this.timer);

        // Find the next player's index
        const currentPlayerIndex = this.aroundTable.findIndex(id => id === this.currentPlayerId);
        const nextPlayerIndex = (currentPlayerIndex + 1) % Object.values(this.users).length;

        this.startTurn(this.aroundTable[nextPlayerIndex]);
    }

    bet(player, amount) {
        const userId = player.id;
        if (userId !== this.currentPlayerId) {
            console.error('It is not this player\'s turn to act.');
            return;
        }

        if (player && player.chips >= amount) {
            this.currentBet += amount;
            player.chips -= amount;
            this.endTurn(); // end this player's turn after action
        }
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
