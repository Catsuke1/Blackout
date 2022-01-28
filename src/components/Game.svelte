<script lang="ts">
  import Board from "./Board.svelte";
  import GameInfo from "./GameInfo.svelte";
  import { Client, Multiplayer, Game } from "../stores";
  import { isMoveValid } from "../game/chess";
  import { IPosition, Position } from "../game/Position";
  import { SquareType } from "../game/SquareTypes";
  import { SelectedPiece } from "../game/SelectedPiece";
  import { Action, Color } from "../game/GameData";
  import { Who } from "../game/MultiplayerHandler";

  let board: Board;

  const selectedPiece = new SelectedPiece();

  const handleGameUpdate = () => {
    if ($Game.winner !== null) {
      Multiplayer.update((currentMultiplayer) => {
        if ($Game.winner === currentMultiplayer.myColor) {
          currentMultiplayer.setWinner(Who.Me);
        } else {
          currentMultiplayer.setWinner(Who.Them);
        }

        return currentMultiplayer;
      });
    }
  };

  const endTurn = () => {
    Game.update((currentGame) => {
      currentGame.nextTurn();

      return currentGame;
    });

    if ($Multiplayer.connected) {
      $Client.connectionClient.send(
        {
          type: "game",
          data: $Game.get(),
        },
        $Multiplayer.connectionId
      );
    }

    handleGameUpdate();
  };

  $Client.openTriggers.push(() => {
    $Client.connectionClient.recievers.push((payload, id) => {
      if (id === $Multiplayer.connectionId) {
        // check if it is the correct connection
        if (payload?.type === "game") {
          Game.update((currentGame) => {
            /*not robust, data may not exist, will pass for now*/
            currentGame.set(payload.data);

            return currentGame;
          });

          handleGameUpdate();
        } else if (payload?.type === "gameReset") {
          Multiplayer.update((currentMultiplayer) => {
            if (currentMultiplayer.requestNewGame(Who.Them)) {
              currentMultiplayer.swapColors();
            }

            return currentMultiplayer;
          });
        }
      }
    });
  });

  const selectPiece = (position: IPosition) => {
    selectedPiece.set(position, $Game.boardData);

    board.highlightSquares(selectedPiece.validMoves);
  };

  const unselectPiece = () => {
    selectedPiece.unset();

    board.clearHighlights();
  };

  const handleSquareClick = (event: any) => {
    if ($Game.winner !== null) return;
    if ($Multiplayer.connected) {
      if ($Multiplayer.myColor !== $Game.turn.color) return;
    }

    const {
      position,
      squareType,
    }: { position: IPosition; squareType: SquareType } = event.detail;

    switch (squareType) {
      case SquareType.Empty:
        if ($Game.turn.action === Action.Card) {
          $Game.boardData.setSquareType(position, SquareType.Card);

          endTurn();
        }

        if ($Game.turn.action === Action.Piece && selectedPiece.isSet) {
          if (isMoveValid(position, selectedPiece.validMoves)) {
            $Game.boardData.movePiece(selectedPiece.position, position);

            endTurn();
          }

          unselectPiece();
        }

        break;

      case SquareType.Card:
        if (selectedPiece.isSet) {
          unselectPiece();
        }

        break;

      case SquareType.WhitePiece:
        if (selectedPiece.isSet) {
          if (Position.isEqual(selectedPiece.position, position)) {
            unselectPiece();
            break;
          }
        }

        unselectPiece();

        if (
          $Game.turn.action === Action.Piece &&
          $Game.turn.color === Color.White
        ) {
          selectPiece(position);
        }

        break;

      case SquareType.BlackPiece:
        if (selectedPiece.isSet) {
          if (Position.isEqual(selectedPiece.position, position)) {
            unselectPiece();
            break;
          }
        }

        unselectPiece();

        if (
          $Game.turn.action === Action.Piece &&
          $Game.turn.color === Color.Black
        ) {
          selectPiece(position);
        }

        break;
    }
  };

  const handleNewGame = () => {
    if ($Multiplayer.connected) {
      let doNewGame: boolean;

      Multiplayer.update((currentMultiplayer) => {
        doNewGame = currentMultiplayer.requestNewGame(Who.Me);

        return currentMultiplayer;
      });

      $Client.connectionClient.send(
        {
          type: "gameReset",
          data: null,
        },
        $Multiplayer.connectionId
      );

      if (doNewGame) {
        Game.update((currentGame) => {
          currentGame.reset();
          return currentGame;
        });

        $Client.connectionClient.send(
          {
            type: "game",
            data: $Game.get(),
          },
          $Multiplayer.connectionId
        );

        Multiplayer.update((currentMultiplayer) => {
          currentMultiplayer.swapColors();

          return currentMultiplayer;
        });
      }
    } else {
      // is not connected
      Game.update((currentGame) => {
        currentGame.reset();
        return currentGame;
      });
    }
  };
</script>

<button on:click={handleNewGame}>New Game</button>

<div class="board-container">
  <Board bind:this={board} on:square-click={handleSquareClick} squareSize={3} />
</div>

<GameInfo />

<style>
  .board-container {
    margin: 1em;
  }
</style>
