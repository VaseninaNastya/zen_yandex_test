class Field {
    constructor (startField) {
        if (startField === undefined){
            this.height = Math.round(Math.random()*50);
            this.width = Math.round(Math.random()*50);
            this.startField = null;
            this.fieldArr = [];
        } else {
            this.startField = require(startField);
            this.width = this.startField.width;
            this.height = this.startField.height;
            this.fieldArr = this.startField.field;
        }
    }
    createFieldArr () {
        let fieldArr = [];
        if ( this.startField === null){
            for (let i = 0; i < this.height; i += 1) {
                let innerArr = [];
                for (let j = 0; j < this.width; j += 1) {
                    let randomStatusOfCell = String(Math.round(Math.random()));
                    let cell = new Cell(randomStatusOfCell).createCell();
                    innerArr.push(cell);
                }
                fieldArr.push(innerArr);
            }
        } else {
            fieldArr = this.fieldArr;
        }
        this.fieldArr = fieldArr;
        setInterval(() => this.autoRefreshField(), 1000);
    }
    autoRefreshField() {
        let fieldArr = this.fieldArr;
        for (let i = 0; i < this.height; i += 1) {
            for (let j = 0; j < this.width; j += 1) {
                const aliveStatusOfCell = fieldArr[i][j];
                const aliveStatusOfCellNeighbors = [];
                let startOflNeighborsY = i - 1;
                let endOflNeighborsY = i + 1;
                let startOflNeighborsX = j - 1;
                let endOflNeighborsX = j + 1;
                if((i === 0) && (j !== 0) && (j !== this.width - 1)){
                    startOflNeighborsY = i;
                }
                if((i === this.height - 1) && (j !== 0) && (j !== this.width - 1)){
                    endOflNeighborsY = i;
                }
                if((i !== 0) && (i !== this.height - 1) && (j === 0)){
                    startOflNeighborsX = j;
                }
                if((i !== 0) && (i !== this.height - 1) && (j === this.width - 1)){
                    endOflNeighborsX = j;
                }
                if((i === 0) && (j === 0)){
                    startOflNeighborsY = i;
                    startOflNeighborsX = j;
                }
                if((i === this.height - 1) && (j === this.width - 1)){
                    endOflNeighborsY = i;
                    endOflNeighborsX = j;
                }
                if((i === 0) && (j === this.width - 1)){
                    startOflNeighborsY = i;
                    endOflNeighborsX = j;
                }
                if((i === this.height - 1) && (j === 0)){
                    endOflNeighborsY = i;
                    startOflNeighborsX = j;
                }
                for (let k = startOflNeighborsY; k <= endOflNeighborsY; k += 1) {
                    for (let l = startOflNeighborsX; l <= endOflNeighborsX; l += 1) {
                        aliveStatusOfCellNeighbors.push(fieldArr[k][l])
                    }
                }
                aliveStatusOfCellNeighbors.splice(aliveStatusOfCellNeighbors.indexOf(aliveStatusOfCell), 1);
                const aliveNeighborsArr = aliveStatusOfCellNeighbors.filter((item) => {return item === "1"});
                if(((aliveNeighborsArr.length === 3) || (aliveNeighborsArr.length === 3)) && (aliveStatusOfCell === "1")){
                    fieldArr[i][j] = "1";
                }
                if((aliveNeighborsArr.length < 2) && (aliveStatusOfCell === "1")){
                    fieldArr[i][j] = "0";
                }
                if((aliveNeighborsArr.length > 3) && (aliveStatusOfCell === "1")){
                    fieldArr[i][j] = "0";
                }
                if((aliveNeighborsArr.length === 3) && (aliveStatusOfCell === "0")){
                    fieldArr[i][j] = "1";
                }
            }
        }
        this.printField(fieldArr);
        this.fieldArr = fieldArr;
    }
    printField(field){
        const output = '================================================\n';
        for (let i = 0; i < this.height; i += 1) {
            for (let j = 0; j < this.width; j += 1) {
                if (field[i][j] === "1") {
                    output += "1";
                } else {
                    output += "0";
                }
                if (j === this.width-1) {
                    output += '\n';
                }
                
            }
        }
        console.log(output);
    }
}
class Cell {
    constructor (alive) {
        this.alive = alive;
    }
    createCell () {
        return this.alive;
    }
}
let startField = process.argv[2];
new Field(startField).createFieldArr();