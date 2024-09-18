interface Card {
  rank: string;
  suit: string;
}

interface Player {
  name: string;
  stack: number;
  status: string;
  bet: number;
  hole_cards: Card[];
  version: string;
  id: number;
}

interface GameState {
  players: Player[];
  tournament_id: string;
  game_id: string;
  round: number;
  bet_index: number;
  small_blind: number;
  orbits: number;
  dealer: number;
  community_cards: Card[];
  current_buy_in: number;
  pot: number;
}

export { Card, Player, GameState };