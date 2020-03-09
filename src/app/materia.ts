import { ICombinationSubject, ITimeblock, Weekday, ISubject } from './algorithm/algorithm-interface';
import { Combination, Timeblock as TimeblockAlgo } from './algorithm/algorithm-object';

import { Time } from '@angular/common';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { addMinutes, sub } from 'date-fns';
import { format, parse } from 'date-fns';

export interface Subject {
    name: string;
    code: string;
    search: string;
    commissions?: Commission[];
    priority?: number;
    credits?: number;
}

export interface Timeblock {
  day: string;
  start: Time;
  end: Time;
  classroom?: string;
  building?: string;
}

export interface Commission {
    name: string;
    professors: string[];
    subject?: Subject;
    schedule: Timeblock[];
    quota?: number;
    people?: number[]; // personas que eligieron la comision como opcion 1, 2 y 3
}

export interface SubjectCommissions {
  subject: Subject; // materia elegida
  commissions?: Commission[]; // comisiones de la elección
}

export interface UserSelection {
  selection: SubjectCommissions[];
  noCourseTime: Timeblock[];
}

export interface Person{
  id: string;
  name: string;
  timetable: Timeblock[];
}

export function generateTimeblockFromITimeblock(timeblock: ITimeblock): Timeblock {
  var weekday: string;

  if (timeblock.day === Weekday.MONDAY) {
    weekday = "Lunes";
  }else if(timeblock.day === Weekday.TUESDAY) {
    weekday = "Martes";
  }else if(timeblock.day === Weekday.WEDNESDAY) {
    weekday = "Miércoles";
  }else if(timeblock.day === Weekday.THURSDAY) {
    weekday = "Jueves";
  }else if(timeblock.day === Weekday.FRIDAY) {
    weekday = "Viernes";
  }else if(timeblock.day === Weekday.SATURDAY) {
    weekday = "Sabado";
  }else if(timeblock.day === Weekday.SUNDAY) {
    weekday = "Domingo";
  }

  return {
    day: weekday,
    start: {minutes: timeblock.getStartMinutes(), hours: timeblock.getStartHours()},
    end: {minutes: timeblock.getEndMinutes(), hours: timeblock.getEndHours()},
    building: timeblock.building,
    classroom: timeblock.classroom
  };
}
export function generateSubjectCommissionsFromCombionation(combination: Combination) {
  var ans: SubjectCommissions[] = [];

  const getAllTimeblock = (timeblock: ITimeblock[]): Timeblock[] => {
    var ans: Timeblock[] = [];

    for (const tt of timeblock){
      ans.push(generateTimeblockFromITimeblock(tt));
    }

    return ans;
  }

  for (const subject of combination.subjects){
    ans.push(
      { subject:
        {
          name: subject.name,
          code: subject.code,
          search: subject.search
        },
        commissions: [
          {
            name: subject.commissionName,
            professors: subject.professors,
            schedule: getAllTimeblock(subject.getAllTimeblocks())
          }
        ]
      }
    )
  };
  return ans;
}
export function generateSubjectCommissionsCopy(subjectCommissions: SubjectCommissions[]){
  var ans: SubjectCommissions[] = [];
  for (let subjectCommission of subjectCommissions){
    ans.push({
      subject: subjectCommission.subject,
      commissions: subjectCommission.commissions
    });
  }
  return ans;
}
export function generateDateFromHours(hours: number, minutes: number) : string{
  var date: Date = new Date();
  date.setMinutes(minutes);
  date.setHours(hours);
  return format(date, "H:mm");
}
export function generateTimeBlockFromData(day: string, startTime: string, endTime: string) : Timeblock{
  var startDate: Date = parse(startTime, "H:mm", new Date());
  var endDate: Date = parse(endTime, "H:mm", new Date());

  
  var timeblock : Timeblock = {
    day: day,
    start: {
      minutes: startDate.getMinutes(),
      hours: startDate.getHours()
    },
    end: {
      minutes: endDate.getMinutes(),
      hours: endDate.getHours()
    }
  }
  console.log(timeblock);
  return timeblock;
}
function generateEmptyOnes(length: number){
  var emptyZeroes : boolean[] = [];
  for (var i = 0;i < length;i++){
    emptyZeroes.push(true);
  }
  return emptyZeroes;
}
export function intersectTimeblock(people : Person[]) : Timeblock[]{
 
  // generating array
  var timeArray : { [day: string] : Boolean[] } =
  {
    "Lunes": generateEmptyOnes(24),
    "Martes": generateEmptyOnes(24),
    "Miércoles": generateEmptyOnes(24),
    "Jueves": generateEmptyOnes(24),
    "Viernes": generateEmptyOnes(24),
  };


  for (let person in people){
    for (let block in people[person].timetable){
      for (let hour = people[person].timetable[block].start.hours; hour < people[person].timetable[block].end.hours;hour++){
        timeArray[people[person].timetable[block].day][hour] = false;
      }
    }
  }

  // generate again the timeblock

  var timeblocks: Timeblock[];

  for (let day in ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]){
    var startPosition: number = -1;

    for (let hour = 0;hour < 24;hour++){
      
      if(timeArray[day][hour] == true && (hour == 0 || timeArray[day][hour-1] == false)){
        startPosition = hour;
      }

      if (timeArray[day][hour] == true && (hour == 23 || timeArray[day][hour+1] == false) ){
        var nuevo: Timeblock = {
          day: day,
          start: {
            hours:startPosition,
            minutes:0
          },
          end:{
            hours:hour+1,
            minutes:0
          }
        };
        timeblocks.push(nuevo);
      }
      
    }
  }

  return timeblocks;
}