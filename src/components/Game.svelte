<script lang="ts">
  import { isMoveValid } from "src/game/chess";
  import { GameData } from "src/game/GameData";
  import { IPosition, Position } from "src/game/Position";
  import { SquareType } from "src/game/SquareTypes";
  import { createGameSettings } from "src/game/GameSettings";
  import Board from "src/components/Board.svelte";
  import { Piece } from "src/game/ActivePiece";
  import { IBoardData } from "src/game/BoardData";

  // should not be here
  const gameSettings = createGameSettings(
    8,
    8,
    [
      [0, 2],
      [0, 4],
    ],
    [
      [7, 3],
      [7, 5],
    ],
    "white",
    "piece"
  );

  // should not be here
  let gameData = new GameData(gameSettings);

  // board component
  let board: Board;

  // reactive vars
  let color: string = gameData.turn.color;
  let action: string = gameData.turn.action;
  let winCondition: string = gameData.winCondition;

  // update reactive vars
  const update = () => {
    color = gameData.turn.color;
    action = gameData.turn.action;

    // prevent further movement and show winner when someone wins
    // don't display anything if there is no winner
    winCondition = gameData.winCondition;

    board.setBoard(gameData.boardData);
  };

  const activePiece = new Piece();

  const newGame = () => {
    gameData = new GameData(gameSettings);
    update();
  };

  const nextTurn = () => {
    gameData.nextTurn();
    update();
  };

  const selectPiece = (position: IPosition, boardData: IBoardData) => {
    activePiece.activate(position, boardData);

    board.highlightSquares(activePiece.validMoves);
  };

  const unselectPiece = () => {
    activePiece.deactivate();

    board.clearHighlights();
  };

  const handleSquareClick = (event: any) => {
    const {
      position,
      squareType,
    }: { position: IPosition; squareType: SquareType } = event.detail;

    switch (squareType) {
      case SquareType.Empty:
        if (gameData.turn.action === "card") {
          gameData.boardData.setSquareType(position, SquareType.Card);

          nextTurn();
        }

        if (gameData.turn.action === "piece" && activePiece.isActive) {
          if (isMoveValid(position, activePiece.validMoves)) {
            gameData.boardData.movePiece(activePiece.position, position);

            nextTurn();
          }

          unselectPiece();
        }

        break;

      case SquareType.Card:
        if (activePiece.isActive) {
          unselectPiece();
        }

        break;

      case SquareType.WhitePiece:
        if (activePiece.isActive) {
          if (Position.isEqual(activePiece.position, position)) {
            unselectPiece();
            break;
          }
        }

        unselectPiece();

        if (
          gameData.turn.action === "piece" &&
          gameData.turn.color === "white"
        ) {
          selectPiece(position, gameData.boardData);
        }

        break;

      case SquareType.BlackPiece:
        if (activePiece.isActive) {
          if (Position.isEqual(activePiece.position, position)) {
            unselectPiece();
            break;
          }
        }

        unselectPiece();

        if (
          gameData.turn.action === "piece" &&
          gameData.turn.color === "black"
        ) {
          selectPiece(position, gameData.boardData);
        }

        break;
    }
  };
</script>

<button on:click={newGame}>New Game</button>

<Board
  bind:this={board}
  boardData={gameData.boardData}
  on:square-click={handleSquareClick}
/>

<div>Turn: {color}</div>
<div>Action: {action}</div>
<div>{winCondition}</div>

<style>
</style>
