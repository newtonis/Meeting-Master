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
    this.collectionName = collectionName;

    this.afs.collection(this.collectionName).valueChanges().subscribe(data => {
      var people: Person[];

      for (const docName in data){
        var doc = data[docName];

        var timetableProcessed = [];
        
        for (const timeblock in doc["timetable"]){
          timetableProcessed.push(
            generateTimeBlockFromData(
              doc["timetable"]["day"],
              doc["timetable"]["start"],
              doc["timetable"]["end"]
            )
          );
        }

        people.push(
          {
            id: docName,
            name: doc["name"],
            timetable: timetableProcessed
          }
        );

      }
      this.data.next(people);

    });
    
  }

  addPerson(name: string){
    this.afs.collection(this.collectionName).add({
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
