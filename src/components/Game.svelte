<script lang="ts">
  import Board from "./Board.svelte";
  import GameInfo from "./GameInfo.svelte";
  import { Client, ConnectionStore, Game } from "../stores";
  import { isMoveValid } from "../game/chess";
  import { IPosition, Position } from "../game/Position";
  import { SquareType } from "../game/SquareTypes";
  import { SelectedPiece } from "../game/SelectedPiece";
  import { Action, Color } from "../game/GameData";

  let board: Board;

  const selectedPiece = new SelectedPiece();

  let gameOver = false;

  const endTurn = () => {
    Game.update((currentGame) => {
      currentGame.nextTurn();

      gameOver = currentGame.winner !== null;

      return currentGame;
    });

    if ($ConnectionStore.connected) {
      $Client.connectionClient.send(
        $Game.boardData.squareTypes,
        $ConnectionStore.connection.id
      );
    }
  };

  $Client.connectionClient.recieve = (squareTypes, id) => {
    if (id === $ConnectionStore.connection.id) {
      Game.update((currentGame) => {
        currentGame.boardData.squareTypes = squareTypes;
        currentGame.nextTurn();

        gameOver = currentGame.winner !== null;

        return currentGame;
      });
    }
  };

  const selectPiece = (position: IPosition) => {
    selectedPiece.set(position, $Game.boardData);

    board.highlightSquares(selectedPiece.validMoves);
  };

  const unselectPiece = () => {
    selectedPiece.unset();

    board.clearHighlights();
  };

  const handleSquareClick = (event: any) => {
    if (gameOver) return;
    if ($ConnectionStore.color !== $Game.turn.color) return;

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
    Game.update((currentGame) => {
      currentGame.reset();
      return currentGame;
    });

    gameOver = false;
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
