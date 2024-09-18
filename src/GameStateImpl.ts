import { Card, Player, GameState } from './GameState';

class GameStateImpl implements GameState {
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

  // Overloaded constructor signatures
  constructor();
  constructor(tournament_id: string,
    game_id: string,
    round: number,
    bet_index: number,
    small_blind: number,
    current_buy_in: number,
    pot: number,
    minimum_raise: number,
    dealer: number,
    orbits: number,
    in_action: number,
    players: Player[],
    community_cards: Card[])
  // Single constructor implementation
  constructor(
    tournament_id: string = '',
    game_id: string = '',
    round: number = 0,
    bet_index: number = 0,
    small_blind: number = 0,
    current_buy_in: number = 0,
    pot: number = 0,
    minimum_raise: number = 0,
    dealer: number = 0,
    orbits: number = 0,
    in_action: number = 0,
    players: Player[] = [],
    community_cards: Card[] = [],

  ) {
    this.tournament_id = tournament_id;
    this.game_id = game_id;
    this.round = round;
    this.bet_index = bet_index;
    this.small_blind = small_blind;
    this.current_buy_in = current_buy_in;
    this.pot = pot;
    this.minimum_raise = minimum_raise;
    this.dealer = dealer;
    this.orbits = orbits;
    this.in_action = in_action;
    this.players = players;
    this.community_cards = community_cards;
  }
}

export default GameStateImpl;