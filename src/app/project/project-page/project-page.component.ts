import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private socketService: SocketService
  ) { }

  loading: boolean = true;
  
  projectDetails: Map<string, string> = new Map( Object.entries({
    created_at: '',
    owner_id: '',
    project_back_end_github: '',
    project_back_end_hosting_provider: '',
    project_back_end_hosting_url: '',
    project_back_end_url: '',
    project_description: '',
    project_end_date: '',
    project_front_end_github: '',
    project_front_end_hosting_provider: '',
    project_front_end_hosting_url: '',
    project_front_end_url: '',
    project_id: '',
    project_name: '',
    project_priority: '',
    project_start_date: '',
    status: '',
    updated_at: '',
  }) );

  taskItems: [{
      task_id: string,
      task_description: string,
      task_priority: number,
      task_status: string,
      subtasks: undefined | [{
        subtask_id: string,
        subtask_description: string,
        subtask_priority: number,
        subtask_status: string,
      }],
    }] | undefined

    newTask: {
      task_id: string,
      task_description: string,
      task_priority: number,
      task_status: string,
      subtasks: undefined | [{
        subtask_id: string,
        subtask_description: string,
        subtask_priority: number,
        subtask_status: string,
      }],
    } = {
      task_id: '',
      task_description: '',
      task_priority: 1,
      task_status: 'None',
      subtasks: undefined,
    }

  data: any = undefined
  id = this.route.snapshot.paramMap.get('id');

  ngOnInit() {

    if(this.id){
      this.projectService.getProject(this.id).subscribe((data) => {
        this.projectDetails = new Map(Object.entries(data));
        this.loading = false;
      });
    }
    this.socketService.listen().subscribe((data: any) => {
      if(data){
        this.taskItems = data
      }
    })
    this.socketService.emit('tasks', this.id)
    
  }

  emit(event: string, data: any){
    this.socketService.emit(event, data);
  }

  setNewTasks(){
    if(this.getNewTaskActivated()){
      this.newTask.task_id = Math.random().toString(36).slice(2, 9)
      this.taskItems?.push(this.newTask)
      this.resetNewTask()
    }
    this.socketService.setNewTasks(this.id, this.taskItems)
  }
  
  getStatusColor(status: string){
    return status ? 
      status === 'Active' ? 
          'hsl(100, 110%, 35%)' : 
        status === 'In Progress' ? 
          'hsl(35, 110%, 35%)' : 
        status === 'Awaiting Review' ? 
          'hsl(45, 110%, 35%)' : 
        status === 'None' ? 
          'hsl(220, 25%, 15%)' : 
        'hsl(0, 100%, 60%)' : 
      'hsl(220, 25%, 15%)'
  }

  getNewTaskActivated(){
    if(this.newTask.task_description !== '' || this.newTask.task_status !== 'None'){
      return true
    }else{
      return false
    }
  }

  resetNewTask(){
    this.newTask = {
      task_id: '',
      task_description: '',
      task_priority: 1,
      task_status: 'None',
      subtasks: undefined,
    }
  }

  newSubtask(task: any){
    console.log('new subtask')
    if(task.subtasks){
      task.subtasks.push({
        subtask_id: '',
        subtask_description: '',
        subtask_priority: 1,
        subtask_status: 'None',
      })
    }else{
      task.subtasks = [{
        subtask_id: '',
        subtask_description: '',
        subtask_priority: 1,
        subtask_status: 'None',
      }]
    }
  }

  getRandomColor(){
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`
    return color
  }

  deleteTask(id: string){
    const newTaskItems: any = this.taskItems?.filter((task: any) => task.task_id !== id)
    console.log(newTaskItems)
    this.taskItems = newTaskItems
  }

  deleteSubTask(task: any, id: string){
    const newSubtasks: any = task.subtasks?.filter((subtask: any) => subtask.subtask_id !== id)
    task.subtasks = newSubtasks
  }

  getStarColor(index: number, priority: number){
    return priority >= index ? '-webkit-text-fill-color:yellow' : '-webkit-text-fill-color:rgba(0,0,0,0.2)'
  }

  getSideColor(seed: string){
    let color = seed.split('').map(char => char.charCodeAt(0).toString(16)).join('').slice(0,6)
    return color
  }
}
