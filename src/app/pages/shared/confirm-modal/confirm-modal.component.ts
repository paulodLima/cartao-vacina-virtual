import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() corpo: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  confirmar() {

  }

  sair() {
    this.bsModalRef.hide();
  }
}
