export function cssSide(side) {
  switch(side) {
    case 'N': return 'top';
    case 'W': return 'left';
    case 'S': return 'bottom';
    case 'E': return 'right';
  }
}

export function cssOtherSide(side) {
  switch(side) {
    case 'N': return 'left';
    case 'W': return 'top';
    case 'S': return 'left';
    case 'E': return 'top';
  }
}

export function cssDimension(side) {
  switch(side) {
    case 'N': return 'height';
    case 'W': return 'width';
    case 'S': return 'height';
    case 'E': return 'width';
  }
}

export function cssOtherDimension(side) {
  switch(side) {
    case 'N': return 'width';
    case 'W': return 'height';
    case 'S': return 'width';
    case 'E': return 'height';
  }
}

