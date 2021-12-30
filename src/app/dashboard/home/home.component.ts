import { Component, OnInit } from "@angular/core";
import { addDoc, collection, deleteDoc, doc, Firestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { ClarityIcons, minusIcon, plusIcon } from "@cds/core/icon";
import { collectionData } from "rxfire/firestore";

ClarityIcons.addIcons(plusIcon, minusIcon);

@Component({
  selector: 'app-home',
  template: `
    <ul>
      <li *ngFor="let item of testDocValue$ | async">
        {{ item.name }}
        <button class="btn btn-icon"  (click)="deleteItem(item)">
          <cds-icon shape="minus"></cds-icon>
        </button>
      </li>
    </ul>

    <form clrForm clrLayout="horizontal">
      <clr-input-container>
        <label>Item</label>
        <input clrInput type="text" [(ngModel)]="item" name="example" />
      </clr-input-container>
      <button class="btn btn-icon" (click)="addItem()">
        <cds-icon shape="plus" size="16" ></cds-icon>
      </button>
    </form>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  testDocValue$: Observable<any>;
  item: string;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const ref = collection(this.firestore, 'items');
    this.testDocValue$ = collectionData(ref, {idField: 'id'})
  }

  async addItem() {
    console.log('adding');
    // Add a new document in collection "cities"
    await addDoc(collection(this.firestore, 'items'), {
      name: this.item,
    });
  }

  async deleteItem(item: any) {
    console.log('deleting');
    await deleteDoc(doc(this.firestore, 'items', item.id));
  }
}
