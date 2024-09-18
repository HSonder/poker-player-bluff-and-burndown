import { Card, Player, GameState } from './GameState';

class GameStateImpl implements GameState {
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
  in_action: number;

  // Overloaded constructor signatures
  constructor();
  constructor(players: Player[], tournament_id: string, game_id: string, round: number, bet_index: number, small_blind: number, orbits: number, dealer: number, community_cards: Card[], current_buy_in: number, pot: number, in_action: number);

  // Single constructor implementation
  constructor(
    players: Player[] = [],
    tournament_id: string = '',
    game_id: string = '',
    round: number = 0,
    bet_index: number = 0,
    small_blind: number = 0,
    orbits: number = 0,
    dealer: number = 0,
    community_cards: Card[] = [],
    current_buy_in: number = 0,
    pot: number = 0,
    in_action: number = 0
  ) {
    this.players = players;
    this.tournament_id = tournament_id;
    this.game_id = game_id;
    this.round = round;
    this.bet_index = bet_index;
    this.small_blind = small_blind;
    this.orbits = orbits;
    this.dealer = dealer;
    this.community_cards = community_cards;
    this.current_buy_in = current_buy_in;
    this.pot = pot;
    this.in_action = in_action;
  }
}

export default GameStateImpl;