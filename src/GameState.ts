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
  tournament_id: string;
  game_id: string;
  round: number;
  bet_index: number;
  small_blind: number;
  current_buy_in: number;
  pot: number;
  minimum_raise: number;
  dealer: number;
  orbits: number;
  in_action: number;
  players: Player[];
  community_cards: Card[];
}

export { Card, Player, GameState };