import { Player } from './Player';
import GameStateImpl from './GameStateImpl';
import GameStateBuilder from './GameStateBuilder';

/*
Test Plan:

Player makes a call: 
	current_buy_in - players[in_action][bet] 
	-> !! Any bet smaller than this amount is treated as a fold

Player raises a bet:
	current_buy_in - players[in_action][bet] + minimum_raise
*/
describe('Player', () => {
  // test('should always make a call when there are no hole cards', () => {
  //   var player = new Player();
  //   var betCallbackResult = 0;
  //   var betCallback = (bet: number) => { betCallbackResult = bet; };

  //   var gameState = new GameStateBuilder()
  //       .setCurrentBuyIn(320)
  //       .setInAction(1)
  //       .addPlayer("Player 1", 1000, "active", 0, [], "Version name 1", 0)
  //       .addPlayer("Player 2", 1000, "active", 0, [], "Version name 2", 1)
  //       .build();
    
  //   // Act
  //   player.betRequest(gameState, betCallback);
    
  //   // Assert
  //   expect(betCallbackResult).toBe(320);
  // });


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
    expect(betCallbackResult).toBe(320);
  });

  test('raises when holecards are a pair', () => {
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
              "rank": "6",
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

  test('raises when holecards plus community cards contain a pair', () => {
    var player = new Player();
    var betCallbackResult = 0;
    var betCallback = (bet: number) => { betCallbackResult = bet; };

    var gameState = new GameStateBuilder()
        .setHoleCards(0, [
          ["5", "hearts"],
          ["6", "spades"]
        ])
        .setCommunityCards([
            ["6", "hearts"],
            ["2", "spades"],
            ["4", "diamonds"]
        ])
        .build();

    // Act
    player.betRequest(gameState, betCallback);

    // Assert
    expect(betCallbackResult).toBe(320 + 240);
  });

  test('raises when holecards are Ace and 4-or-higher', () => {
    var player = new Player();
    var betCallbackResult = 0;
    var betCallback = (bet: number) => { betCallbackResult = bet; };

    var gameState = new GameStateBuilder()
        .setHoleCards(0, [
          ["A", "hearts"],
          ["4", "spades"]
        ])
        .build();

    // Act
    player.betRequest(gameState, betCallback);

    // Assert
    expect(betCallbackResult).toBe(320 + 240);
  });

  test('raises when holecards are King and 8-or-higher', () => {
    var player = new Player();
    var betCallbackResult = 0;
    var betCallback = (bet: number) => { betCallbackResult = bet; };

    var gameState = new GameStateBuilder()
        .setHoleCards(0, [
          ["K", "hearts"],
          ["8", "spades"]
        ])
        .build();

    // Act
    player.betRequest(gameState, betCallback);

    // Assert
    expect(betCallbackResult).toBe(320 + 240);
  });

});
