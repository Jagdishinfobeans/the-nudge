function checkWin(gridData) {
  // Check rows for a win
  for (let i = 0; i < 3; i++) {
    if (
      gridData[i][0].isCorrectAnswer === true &&
      gridData[i][1].isCorrectAnswer === true &&
      gridData[i][2].isCorrectAnswer === true
    ) {
      return true;
    }
  }

  // Check columns for a win
  for (let j = 0; j < 3; j++) {
    if (
      gridData[0][j].isCorrectAnswer === true &&
      gridData[1][j].isCorrectAnswer === true &&
      gridData[2][j].isCorrectAnswer === true
    ) {
      return true;
    }
  }

  // Check diagonals for a win
  if (
    (gridData[0][0].isCorrectAnswer === true &&
      gridData[1][1].isCorrectAnswer === true &&
      gridData[2][2].isCorrectAnswer === true) ||
    (gridData[0][2].isCorrectAnswer === true &&
      gridData[1][1].isCorrectAnswer === true &&
      gridData[2][0].isCorrectAnswer === true)
  ) {
    return true;
  }

  return false;
}

function checkLose(gridData) {
  // Check rows for a lose
  for (let i = 0; i < 3; i++) {
    if (
      gridData[i][0].isCorrectAnswer === false &&
      gridData[i][1].isCorrectAnswer === false &&
      gridData[i][2].isCorrectAnswer === false
    ) {
      return true;
    }
  }

  // Check columns for a lose
  for (let j = 0; j < 3; j++) {
    if (
      gridData[0][j].isCorrectAnswer === false &&
      gridData[1][j].isCorrectAnswer === false &&
      gridData[2][j].isCorrectAnswer === false
    ) {
      return true;
    }
  }

  // Check diagonals for a lose
  if (
    (gridData[0][0].isCorrectAnswer === false &&
      gridData[1][1].isCorrectAnswer === false &&
      gridData[2][2].isCorrectAnswer === false) ||
    (gridData[0][2].isCorrectAnswer === false &&
      gridData[1][1].isCorrectAnswer === false &&
      gridData[2][0].isCorrectAnswer === false)
  ) {
    return true;
  }

  return false;
}

module.exports = {
  checkWin,
  checkLose,
};
