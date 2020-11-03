/**
 * @overview
 * @copyright (c) JSC Intel A/O
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProblem} from '@idlp/root/models';
import {Store} from '@ngxs/store';
import {ProblemDelete} from '@idlp/routed/problem-list/problem-list.actions';
import {SendWebSocketMessage} from '@ngxs/websocket-plugin';

const DESCRIPTION_LENGTH = 235;

@Component({
  selector: 'idlp-problem-card-item',
  templateUrl: './problem-card-item.component.html',
  styleUrls: ['./problem-card-item.component.scss']
})
export class IdlpProblemCardItemComponent {
  @Input()
  width: number;

  @Input()
  height: number;

  @Input()
  problem: IProblem;

  @Output()
  enter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private store: Store,
  ) {
  }

  get description(): string {
    if (this.problem.description) {
      if (this.problem.description.length > DESCRIPTION_LENGTH) {
        return `${this.problem.description.substr(0, DESCRIPTION_LENGTH)}...`;
      }
      return this.problem.description;
    }
    return '';
  }

  delete(): void {
    this.store.dispatch(new SendWebSocketMessage({
      event: ProblemDelete.type,
      data: {id: this.problem.id},
    }));
  }
}
