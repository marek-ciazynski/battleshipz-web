import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AvailableShips, ShipPlacementService } from '../shared/game-board/ship-placement.service';

@Component({
	selector: 'app-prepare-board-view',
	templateUrl: './prepare-board-view.component.html',
	styleUrls: ['./prepare-board-view.component.scss']
})
export class PrepareBoardViewComponent implements OnInit {

	opponentInfo = 'Your opponent is still preparing';

	private boardSize = 10;
	boardFiledIds = this.generateFieldCoords(this.boardSize);

	availableShips: AvailableShips[] = [
		{size: 4, count: 1},
		{size: 3, count: 2},
		{size: 2, count: 3},
		{size: 1, count: 4},
	];


	constructor(private placementService: ShipPlacementService) { }

	ngOnInit(): void { }

	allShipsUsed() {
		return this.availableShips.every(x => x.count === 0);
	}

	generateFieldCoords(boardSize: number): string[] {
		const coords = Array(boardSize).fill('').map((row,y) => {
			return Array(boardSize).fill('').map((col,x) => {
				const rowChar = String.fromCharCode('A'.charCodeAt(0) + y);
				const colChar = x.toString();
				return `${rowChar}${colChar}`;
			})
		})
		console.log(coords.flat());
		return coords.flat();
	}

	shipDrop(event: CdkDragDrop<string[]>) {
		// moveItemInArray(this.ships, event.previousIndex, event.currentIndex);
		console.log('PREP:DROP', event.previousIndex, event.currentIndex, event);
		const shipConfig = event.item.data;
		if (event.previousContainer != event.container) {
			console.log('Decrementing', shipConfig.count)
			shipConfig.count -= 1;
		}
	}

	shipEnter(event: CdkDragEnter<any>) {
		console.log('PREP:ENTER2', event);
	}

	shipExit(event: CdkDragExit<any, any>) {
		console.log('PREP:EXIT2', event);
	}

	private getRandomInt(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	arrangeShipsRandomly() {
		while (!this.allShipsUsed()) {
			const col = this.getRandomInt(0, 9).toString();
			const row = String.fromCharCode('A'.charCodeAt(0) + this.getRandomInt(0, 9));
			const field = row + col;

			// const newShipConfig: ShipConfig

			console.log(field)
		}
	}

	playerReady() {
		console.log('Marked as ready')
	}
}
