import { Card, GameState } from "./GameState";

export class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    try 
    {
      console.log(`Show gameState: ${JSON.stringify(gameState)}`);
      gameState.players[gameState.in_action].hole_cards.splice
      var nextBet;
      if (this.weHaveTwoGoodCards(gameState.players[gameState.in_action].hole_cards)) {
        nextBet = this.raiseHigh(gameState);
      } else if(
        this.weHaveAPair(gameState.players[gameState.in_action].hole_cards.concat(gameState.community_cards))) {
        // check if we have a pair
        nextBet = this.raise(gameState);

        // check if we have a straight
        // check if we have a flush
        // check if we have a full house
        // check if we have a four of a kind
        // check if we have a straight flush
        // check if we have a royal flush

      } else {
        nextBet = this.fold(gameState);
      }
      betCallback(nextBet);
    }
    catch (error) {
      console.log(`Error: ${error}`);
      betCallback(0);
    }
  }
  private fold(gameState: GameState): any {
    return 0
  }

    private rankValueMap: { [key: string]: number } = {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14
  };
  private getCardValue(rank: string): number {
    return this.rankValueMap[rank] || 0; // Return 0 if the rank is not found
  }

  private weHaveTwoGoodCards(hole_cards: Card[]) : boolean {
      return  hole_cards[0].rank == 'A' && this.getCardValue(hole_cards[1].rank) >= 4 ||
              hole_cards[0].rank == 'K' && this.getCardValue(hole_cards[1].rank) >= 8 ||
              hole_cards[1].rank == 'A' && this.getCardValue(hole_cards[0].rank) >= 4 ||
              hole_cards[1].rank == 'K' && this.getCardValue(hole_cards[0].rank) >= 8 ||
              hole_cards[0].rank == 'Q' && this.getCardValue(hole_cards[1].rank) >= 9 ||
              hole_cards[1].rank == 'Q' && this.getCardValue(hole_cards[0].rank) >= 9 ||
              hole_cards[0].rank == 'J' && this.getCardValue(hole_cards[1].rank) >= 9 ||
              hole_cards[1].rank == 'J' && this.getCardValue(hole_cards[0].rank) >= 9 ||
              hole_cards[0].rank == '10' && this.getCardValue(hole_cards[1].rank) >= 8 ||
              hole_cards[1].rank == '10' && this.getCardValue(hole_cards[0].rank) >= 8 ||
              hole_cards[0].rank == '9' && this.getCardValue(hole_cards[1].rank) >= 8 ||
              hole_cards[1].rank == '9' && this.getCardValue(hole_cards[0].rank) >= 8 ||
              hole_cards[0].rank == '8' && this.getCardValue(hole_cards[1].rank) >= 8 ||
              hole_cards[1].rank == '8' && this.getCardValue(hole_cards[0].rank) >= 8;
  }

  private weHaveAPair(cards: Card[]) : boolean {
    const aMap: { [key: string]: number } = {};
    let found = false;
    cards.forEach(card => {
      if (!aMap[card.rank]) {
        aMap[card.rank] = 1;
      } else {
        aMap[card.rank]++;
        found = true;
      }
    });
    if (found) {
      console.log("We have a pair, aMap: " + JSON.stringify(aMap));
    }
    // return cards[0].rank == cards[1].rank;
    return found;
  }

  private call(gameState: GameState) {
    return gameState.current_buy_in - gameState.players[gameState.in_action].bet;
  }

  // raise if we have an ace or K, Q, or J?
  private raise(gameState: GameState) {
    return gameState.current_buy_in - gameState.players[gameState.in_action].bet +
      gameState.minimum_raise;
  }

  private raiseHigh(gameState: GameState) {
    return gameState.current_buy_in - gameState.players[gameState.in_action].bet +
      gameState.minimum_raise + 100;
  }

  private weHaveAceKQJ(holeCards: Card[]) {
    let n = holeCards.length;
    for (var index = 0; index < n; index++) {
      const rank = holeCards[index].rank;
      if (rank == 'A' || rank == 'K' || rank == 'Q' || rank == 'J' ) {
        return true;
      }
    }
    return false;
  }

  public showdown(gameState: GameState): void {
    console.log(`SHOWDOWN gameState: ${JSON.stringify(gameState)}`);
  }
};

export default Player;
