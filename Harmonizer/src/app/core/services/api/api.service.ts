import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'ToDo' | 'InProgress' | 'Done';
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  tasks : any[] = [];
  constructor(private http: HttpClient) {}


  UpdateTask(id: any, result: any) {
    return this.http.put(`https://harmonizer-backend.onrender.com/EditTask?taskid=${id}`,result)
  }


  Login(userProfile: any) {
    return this.http.post(`https://harmonizer-backend.onrender.com/api/auth/login`,userProfile);
  }

  GetUserDetails(userid: any ) {
    return this.http.get(`https://harmonizer-backend.onrender.com/api/auth/GetUserDetailsById?id=${userid}`)
  }

  updateTaskStatus(updatedTask: { Id: number; statusId: number; }) {
    return this.http.put(`https://harmonizer-backend.onrender.com/updatestatus`,updatedTask);
  }





  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/data/tasks.json').pipe(
      map(tasks => {
        this.tasks = tasks;
        return tasks;
      }),
      catchError(error => {
        console.error('Error fetching tasks', error);
        return [];
      })
    );
  }

  getTasksByStatus(status: string): Task[] {
    console.log(this.tasks)
    return this.tasks.filter(task => task.status === status);
  }

  getTaskByUserId(userid : string){
    return this.http.get(`https://harmonizer-backend.onrender.com/GetTaskByUserId?userId=${userid}`)
  }

  CreateTask(newTask: { title: string | null | undefined; description: string | null | undefined; userId: string | null; statusId: number; }) {
   return this.http.post(`https://harmonizer-backend.onrender.com/create task`,newTask);
  }

  DeleteTask(taskId : any){
    return this.http.delete(`https://harmonizer-backend.onrender.com/DeleteTask?taskId=${taskId}`)
  }

  getTaskById(taskId : any){
    return this.http.get(`https://harmonizer-backend.onrender.com/GetTaskById?taskid=${taskId}`)
  }
}
