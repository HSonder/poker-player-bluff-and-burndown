import { Card, GameState } from "./GameState";

export class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    try 
    {
      betCallback(0);
      return;
      console.log(`Show gameState: ${JSON.stringify(gameState)}`);
      var nextBet;
      if (this.weHaveAceKQJ(gameState.players[gameState.in_action].hole_cards)) {
        nextBet = this.raise(gameState);
      } else {
        nextBet = this.call(gameState);
      }
      betCallback(nextBet);
    }
    catch (error) {
      console.log(`Error: ${error}`);
      betCallback(0);
    }
  }

  private call(gameState: GameState) {
    return gameState.current_buy_in - gameState.players[gameState.in_action].bet;
  }

  // raise if we have an ace or K, Q, or J?
  private raise(gameState: GameState) {
    return gameState.current_buy_in - gameState.players[gameState.in_action].bet +
      gameState.minimum_raise;
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
