import { observable, computed, toJS } from 'mobx';
import { Fb } from '../Firebase';

class Contacts {
  @observable all = [{}]

  constructor() {
    // .once lädt die Kontakte nur einmal zur Laufzeit
    Fb.contacts.once('value', (snapshot) => {
      this.all = snapshot.val()
    })
  }

  @computed get json() {
    return toJS(this.all)
  }

}

export default new Contacts()
