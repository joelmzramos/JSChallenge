// Rover Object Goes Here
// ======================
var control = {
  rover: 
  [{
    name: "Thor",
    direction: "N",
    x: 0,
    y: 0,
    travelLog: [],
    obstacles: []
  },
  {
    name: "IronRover",
    direction: "N",
    x: 1,
    y: 0,
    travelLog: [],
    obstacles: []    
  }
  ],
  grid: [
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],                
  ] 
};

// Inicializa o objeto grid
console.log(control.rover);
for(let i = 0; i < control.rover.length; i++){
control.grid[control.rover[i].y][control.rover[i].x] = control.rover[i].name;
}
console.log(control.grid);

// Executa lista de comandos
function commandList(commmands, number){
  for(var i = 0; i < commmands.length; i++){
    switch(commmands[i]){
      case "f":
        moveForward(control.rover, number);
        break;
      case "l":
        turnLeft(control.rover, number);
        break;
      case "r":
        turnRight(control.rover, number);      
        break;
      case "b":
        moveBackward(control.rover, number);
        break;
      default:
        console.log(commmands[i]+" is a invalid input");
    }
  }
}

// Vira a esquerda
function turnLeft(rover, number){
  console.log("turnLeft was called!");
  switch(rover[number].direction){
    case "N":
      rover[number].direction = "W";
      break;
    case "W":
      rover[number].direction = "S";
      break;
    case "S":
      rover[number].direction = "E";  
      break;      
    case "E":
      rover[number].direction = "N";
      break;
    default:

  }
}

// Vira a direita
function turnRight(rover, number){
  console.log("turnRight was called!");
  switch(rover[number].direction){
    case "N":
      rover[number].direction = "E";
      break;
    case "W":
      rover[number].direction = "N";
      break;
    case "S":
      rover[number].direction = "W";  
      break;      
    case "E":
      rover[number].direction = "S";
      break;
    default:

  }  
}

// Move para frente
function moveForward(rover, number){
  var moveX = rover[number].x;
  var moveY = rover[number].y;
  switch(rover[number].direction){
    case "N":
      moveY -= 1;
      break;
    case "W":
      moveX -= 1;
      break;
    case "S":
      moveY += 1;
      break;      
    case "E":
      moveX += 1;
      break;
    default:
  } 
  console.log(movementValidations(moveX, moveY, rover, number));
}

// Move para traz
function moveBackward(rover, number){
  var moveX = rover.x;
  var moveY = rover.y;
  switch(rover[number].direction){
    case "N":
      moveY += 1;
      break;
    case "W":
      moveX += 1;
      break;
    case "S":
      moveY -= 1;
      break;      
    case "E":
      moveX -= 1;
      break;
    default:
  } 
  console.log(movementValidations(moveX, moveY, rover, number));
}

// Adiciona Obstaculo
function addObstacles(obstacles, number){
  if(obstacles[1] > 9 || obstacles[1] < 0 || obstacles[2] > 9 || obstacles[2] < 0){
    console.log("Invalid position");
  } else {
    control.rover[number].obstacles.push(obstacles);
    control.grid[obstacles[0]][obstacles[1]] = "Obstacle!"
  }
}

// Função para validações de movimento do rover
function movementValidations(moveX, moveY, rover, number){

  var haveObstacle = false;
  var haveAnotherRover = false;
  
  if(moveX < 0 || moveX > 9 || moveY < 0 || moveY > 9){
    console.log("Invalid movement");
  } else {
// Valida se a posição possui obstaculo    
    if(rover[number].obstacles.length > 0){
      for(let i = 0; i < rover[number].obstacles.length; i++){
        if(moveX === rover[number].obstacles[i][0] && moveY === rover[number].obstacles[i][1]){
          haveObstacle = true;
          console.log("Obstacle!!!")
        }
      }
    }
// Valida as posições dos rovers    
    for(let i = 0; i < rover.length; i++){     
      if(i !== number){
        if(rover[i].x === moveX && rover[i].y === moveY){
          console.log("Error: Another rover has the same position!")
          haveAnotherRover = true;
        }
      }
    }
    if(haveObstacle === false && haveAnotherRover === false){
      control.grid[control.rover[number].y][control.rover[number].x] = null;
      control.grid[moveY][moveX] = control.rover[number].name;
      rover[number].x = moveX;
      rover[number].y = moveY;
      rover[number].travelLog.push([rover[number].x,rover[number].y]);
    }
  }
}