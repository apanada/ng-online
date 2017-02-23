import { forEach } from '@angular/router/src/utils/collection';
import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'  
})

export class DemoComponent {  
  courses: FirebaseListObservable<any[]>;
  coursesOrdered: FirebaseListObservable<any[]>;
  coursesObject: FirebaseObjectObservable<any>;

  constructor(private af: AngularFire) {
    // FirebaseListObservable Demo
    this.courses = this.af.database.list('/Courses', {
      query: {
        limitToLast: 10,
        orderBykey: true
      },
      preserveSnapshot: false
    });

    /*this.courses.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.key)
        console.log(snapshot.val())
      });
    })*/

    //this.courses.push({ Name: 'Angular 2', Duration: 5, Fees: '10000' });

    // FirebaseListObservable OrderBy Demo
    this.coursesOrdered = this.af.database.list('/Courses', {
      query: {
        orderByChild: 'Name' ,
        equalTo: 'C#'
      },
      preserveSnapshot: true
    });

    this.coursesOrdered.subscribe(snapshots => {
      snapshots.forEach(snapshot => {
        console.log(snapshot.key)
        console.log(snapshot.val())
      });
    })

    // FirebaseObjectObservable Demo
    this.coursesObject = this.af.database.object('/Courses', { preserveSnapshot: true });
    this.coursesObject.subscribe(snapshot => {
      console.log(snapshot.key);
      console.log(snapshot.val());
      forEach(snapshot.val(), course => {
        console.log('Name : ' + course['Name']);
        console.log('Duration : ' + course['Duration']);
        console.log('Fees : ' + course['Fees']);
      })
    })
  }
  addCourse(newCourse: string) {
    this.courses.push({ Name: newCourse });
  }
  updateCourse(key: string, newCourse: string) {
    this.courses.update(key, { Name: newCourse });
  }
  deleteCourse(key: string) {
    this.courses.remove(key);
  }
  deleteEverything() {
    this.courses.remove();
  }
}
