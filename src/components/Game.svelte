<script lang="ts">
  import { getValidQueenMoves, isMoveValid } from "src/game/chess";
  import { GameData } from "src/game/GameData";
  import { isEqual, IPosition } from "src/game/Position";
  import { SquareTypes } from "src/game/SquareTypes";
  import { createGameSettings } from "src/game/GameSettings";
  import Board from "src/components/Board.svelte";

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

  let gameData = new GameData(gameSettings);
  let boardData = gameData.boardData;

  let board: Board;

  let color: string = gameData.turn.color;
  let action: string = gameData.turn.action;
  let winCondition: string = gameData.winCondition;

  const activePiece: {
    wasClicked: boolean;
    position: IPosition;
    validMoves: IPosition[];
  } = {
    wasClicked: false,
    position: undefined,
    validMoves: undefined,
  };

  const nextTurn = () => {
    gameData.nextTurn();
    color = gameData.turn.color;
    action = gameData.turn.action;
    winCondition = gameData.winCondition;
    board.setBoard(gameData.boardData);
  };

  const setActivePiece = (position: IPosition, validMoves: IPosition[]) => {
    activePiece.wasClicked = true;
    activePiece.position = position;
    activePiece.validMoves = validMoves;

    board.highlightSquares(validMoves);
  };

  const resetPiece = () => {
    activePiece.wasClicked = false;
    activePiece.position = undefined;
    activePiece.validMoves = undefined;

    board.clearHighlights();
  };

  const handleSquareClick = (event: any) => {
    const {
      position,
      squareType,
    }: { position: IPosition; squareType: SquareTypes } = event.detail;

    switch (squareType) {
      case SquareTypes.Empty:
        if (gameData.turn.action === "card") {
          gameData.boardData.setSquareType(position, SquareTypes.Card);

          nextTurn();
        }

        if (gameData.turn.action === "piece" && activePiece.wasClicked) {
          if (isMoveValid(position, activePiece.validMoves)) {
            gameData.boardData.movePiece(activePiece.position, position);

            resetPiece();

            nextTurn();
          } else {
            resetPiece();
          }
        }
        break;

      case SquareTypes.Card:
        resetPiece();
        break;

      case SquareTypes.WhitePiece:
        if (activePiece.wasClicked) {
          if (isEqual(activePiece.position, position)) {
            resetPiece();
            break;
          }
        }

        resetPiece();

        if (
          gameData.turn.action === "piece" &&
          gameData.turn.color === "white"
        ) {
          const validMoves = getValidQueenMoves(gameData.boardData, position);

          setActivePiece(position, validMoves);
        }
        break;

      case SquareTypes.BlackPiece:
        if (activePiece.wasClicked) {
          if (isEqual(activePiece.position, position)) {
            resetPiece();
            break;
          }
        }

        resetPiece();

        if (
          gameData.turn.action === "piece" &&
          gameData.turn.color === "black"
        ) {
          const validMoves = getValidQueenMoves(gameData.boardData, position);

          setActivePiece(position, validMoves);
        }
        break;
    }
  };
</script>

<button id="newGame">New Game</button>

<Board bind:this={board} {boardData} on:square-click={handleSquareClick} />

<div>Turn: {color}</div>
<div>Action: {action}</div>
<div>{winCondition}</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
