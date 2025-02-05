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


  Login(userProfile: any) {
    return this.http.post(`https://localhost:7119/api/auth/login`,userProfile);
  }

  GetUserDetails(userid: any ) {
    return this.http.get(`https://localhost:7119/api/auth/GetUserDetailsById?id=${userid}`)
  }

  updateTaskStatus(updatedTask: { Id: number; statusId: number; }) {
    return this.http.put(`https://localhost:7119/updatestatus`,updatedTask);
  }


  tasks : any[] = [];
  constructor(private http: HttpClient) { }

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
    return this.http.get(`https://localhost:7119/GetTaskByUserId?userId=${userid}`)
  }

  CreateTask(newTask: { title: string | null | undefined; description: string | null | undefined; userId: string; statusId: number; }) {
   return this.http.post(`https://localhost:7119/create task`,newTask);
  }

  DeleteTask(taskId : any){
    return this.http.delete(`https://localhost:7119/DeleteTask?taskId=${taskId}`)
  }

}
