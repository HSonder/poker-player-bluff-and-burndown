import { Player } from './Player';
import GameStateImpl from './GameStateImpl';

/*
Test Plan:

Player makes a call: 
	current_buy_in - players[in_action][bet] 
	-> !! Any bet smaller than this amount is treated as a fold

Player raises a bet:
	current_buy_in - players[in_action][bet] + minimum_raise
*/
describe('Player', () => {
  test('should always make a call when there are no hole cards', () => {
    var player = new Player();
    var betCallbackResult = 0;
    var betCallback = (bet: number) => { betCallbackResult = bet; };
    var gameState = new GameStateImpl();
    gameState.players = 
      [
        {
          name: "Player 1",
          stack: 1000,
          status: "active",
          bet: 0,
          hole_cards: [],
          version: "Version name 1",
          id: 0
        },
        {
          name: "Player 2",
          stack: 1000,
          status: "active",
          bet: 0,
          hole_cards: [],
          version: "Version name 2",
          id: 1
        }
      ]
    gameState.current_buy_in = 320;
    gameState.in_action = 1;
    
    // Act
    player.betRequest(gameState, betCallback)
    
    // Assert
    expect(betCallbackResult).toBe(320);
  });


  test('raises with minimum raise', () => {
    var player = new Player();
    var betCallbackResult = 0;
    var betCallback = (bet: number) => { betCallbackResult = bet; };
    var gameState = new GameStateImpl();
    gameState.minimum_raise = 240;
    gameState.players = 
      [
        {
          name: "Player 1",
          stack: 1000,
          status: "active",
          bet: 0,
          hole_cards: [],
          version: "Version name 1",
          id: 0
        },
        {
          name: "Player 2",
          stack: 1000,
          status: "active",
          bet: 0,
          hole_cards: [
            {
              // Rank of the card. Possible values are 
              // numbers 2-10 and J,Q,K,A 
              "rank": "6",                    
              // Suit of the card. Possible values are: 
              // clubs,spades,hearts,diamonds 
              "suit": "hearts"                
            },
            {
              "rank": "A",
              "suit": "spades"
            }
          ],
          version: "Version name 2",
          id: 1
        }
      ]
    gameState.current_buy_in = 320;
    gameState.in_action = 1;

    // Act
    player.betRequest(gameState, betCallback)
    
    // Assert
    expect(betCallbackResult).toBe(320 + 240);
  });


  test('raises with minimum raise', () => {
    var player = new Player();
    var betCallbackResult = 0;
    var betCallback = (bet: number) => { betCallbackResult = bet; };
    var gameState = new GameStateImpl();
    gameState.minimum_raise = 240;
    gameState.players = 
      [
        {
          name: "Player 1",
          stack: 1000,
          status: "active",
          bet: 0,
          hole_cards: [],
          version: "Version name 1",
          id: 0
        },
        {
          name: "Player 2",
          stack: 1000,
          status: "active",
          bet: 0,
          hole_cards: [
            {
              // Rank of the card. Possible values are 
              // numbers 2-10 and J,Q,K,A 
              "rank": "6",
              // Suit of the card. Possible values are: 
              // clubs,spades,hearts,diamonds 
              "suit": "hearts"
            },
            {
              "rank": "J",
              "suit": "spades"
            }
          ],
          version: "Version name 2",
          id: 1
        }
      ]
    gameState.current_buy_in = 320;
    gameState.in_action = 1;

    // Act
    player.betRequest(gameState, betCallback)

    // Assert
    expect(betCallbackResult).toBe(320 + 240);
  });

});
