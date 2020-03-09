import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Person, Timeblock, generateDateFromHours, generateTimeBlockFromData } from './materia';
import { Observable, BehaviorSubject } from 'rxjs';
import { parse, format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class PeopleTimetableManagerService {

  data: BehaviorSubject<Person[]> = new BehaviorSubject([]);
  collectionName: string;

  constructor(private afs: AngularFirestore) {

  }

  startDataHandler(collectionName: string){
    console.log(`starting data handler on ${collectionName}`);
    this.collectionName = collectionName;

    this.afs.collection(this.collectionName).valueChanges().subscribe(data => {
      /*console.log(`new data on collection arrived ${data}`);
      console.log(data);*/
      
      var people: Person[] = [];
      for (const docName in data){
        var doc = data[docName];

        var timetableProcessed = [];
        for (const timeblock in doc["timetable"]){
          timetableProcessed.push(
            generateTimeBlockFromData(
              doc["timetable"][timeblock]["day"],
              doc["timetable"][timeblock]["start"],
              doc["timetable"][timeblock]["end"]
            )
          );
        }
        people.push(
          {
            id: doc["name"],
            name: doc["name"],
            timetable: timetableProcessed
          }
        );

      }
      this.data.next(people);

    });
    
  }

  addPerson(name: string){
    console.log(`adding ${name}`);
    this.afs.collection(this.collectionName).doc(name).set({
      name: name,
      timetable: []
    }).then(data => {
      console.log(`added doc name=${name}`);
    })
  }
  removePerson(id: string){
    this.afs.collection(this.collectionName).doc(id).delete().then(data => {
      console.log(`deleted doc id=${id}`);
    })
  }
  updatePerson(id: string, horarios: Timeblock[]){
    console.log(horarios);
    
    var horariosProcesados = [];

    for (var horario of horarios){
      horariosProcesados.push(
        {
          day: horario.day,
          start: generateDateFromHours(
            horario.start.hours,
            horario.start.minutes
          ),
          end: generateDateFromHours(
            horario.end.hours,
            horario.end.minutes
          )
        }
      );
    }

    this.afs.collection(this.collectionName).doc(id).update(
      {
        timetable: horariosProcesados
      }
    ).then(data => {
      console.log(`updated doc id=${id}`);
    });

  }
  getDataObservable() : Observable<Person[]>{ // get updated data observable
    return this.data.asObservable();
  }
}
