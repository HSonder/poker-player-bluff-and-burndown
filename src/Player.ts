export class Player {
  public betRequest(gameState: any, betCallback: (bet: number) => void): void {
    console.log(`Show gameState: ${JSON.stringify(gameState)}`);
    var nextBet = gameState.current_buy_in - gameState.players[gameState.in_action].bet;
    betCallback(nextBet);
  }

  public showdown(gameState: any): void {

  }
};

export default Player;
