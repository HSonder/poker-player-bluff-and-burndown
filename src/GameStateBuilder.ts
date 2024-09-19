import GameStateImpl from "./GameStateImpl";

class GameStateBuilder {
  private gameState: GameStateImpl;

  constructor() {
      this.gameState = new GameStateImpl();
      this.gameState.minimum_raise = 240;
      this.gameState.current_buy_in = 320;
      this.gameState.in_action = 0; // Default to 0
      this.gameState.players = [
          {
              name: "Default Player",
              stack: 1000,
              status: "active",
              bet: 0,
              hole_cards: [],
              version: "Default Version",
              id: 0
          }
      ]; // Add a single player by default
      this.gameState.community_cards = []; // Initialize community cards
  }

  setMinimumRaise(minimumRaise: number): GameStateBuilder {
      this.gameState.minimum_raise = minimumRaise;
      return this;
  }

  setCurrentBuyIn(currentBuyIn: number): GameStateBuilder {
      this.gameState.current_buy_in = currentBuyIn;
      return this;
  }

  setInAction(inAction: number): GameStateBuilder {
      this.gameState.in_action = inAction;
      return this;
  }

  addPlayer(name: string, stack: number, status: string, bet: number, holeCards: [string, string][], version: string, id: number): GameStateBuilder {
      this.gameState.players.push({
          name,
          stack,
          status,
          bet,
          hole_cards: holeCards.map(([rank, suit]) => ({ rank, suit })),
          version,
          id
      });
      return this;
  }

  setHoleCards(playerId: number, holeCards: [string, string][]): GameStateBuilder {
      const player = this.gameState.players.find(p => p.id === playerId);
      if (player) {
          player.hole_cards = holeCards.map(([rank, suit]) => ({ rank, suit }));
      }
      return this;
  }

  setCommunityCards(communityCards: [string, string][]): GameStateBuilder {
      this.gameState.community_cards = communityCards.map(([rank, suit]) => ({ rank, suit }));
      return this;
  }

  build(): GameStateImpl {
      return this.gameState;
  }
}

export default GameStateBuilder;

// Usage example
const gameState = new GameStateBuilder()
  .setMinimumRaise(240)
  .setCurrentBuyIn(320)
  .setInAction(1)
  .addPlayer("Player 1", 1000, "active", 0, [], "Version name 1", 0)
  .addPlayer("Player 2", 1000, "active", 0, [], "Version name 2", 1)
  .setHoleCards(1, [
      ["6", "hearts"],
      ["6", "spades"]
  ])
  .setCommunityCards([
      ["A", "hearts"],
      ["K", "spades"],
      ["Q", "diamonds"]
  ])
  .build();