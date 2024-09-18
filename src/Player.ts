import { GameState } from "./GameState";

export class Player {
  public betRequest(gameState: GameState, betCallback: (bet: number) => void): void {
    console.log(`Show gameState: ${JSON.stringify(gameState)}`);
    var nextBet = this.call(gameState);
    betCallback(nextBet);
  }

  private call(gameState: GameState) {
    return gameState.current_buy_in - gameState.players[gameState.in_action].bet;
  }

  public showdown(gameState: GameState): void {

  }
};

export default Player;
