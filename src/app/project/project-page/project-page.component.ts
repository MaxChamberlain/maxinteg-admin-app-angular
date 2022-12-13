import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-50px)' }),
          stagger('50ms', animate('250ms ease-in', style({ opacity: 1, transform: 'translateY(10px)', '-ms-transform': 'translateY(10px)', '-moz-transform': 'translateY(10px)', '-webkit-transform': 'translateY(10px)', '-o-transform': 'translateY(10px)' })))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0px)' }),
          stagger('50ms', animate('150ms ease-out', style({ opacity: 0, transform: 'translateY(-50px)', '-ms-transform': 'translateY(-50px)', '-moz-transform': 'translateY(-50px)', '-webkit-transform': 'translateY(-50px)', '-o-transform': 'translateY(-50px)' })))
        ], { optional: true })
      ])      
    ])
  ]
})
export class ProjectPageComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private socketService: SocketService
  ) {  }

  itemRemovedIndex: any = -1;

  loading: boolean = true;

  openSubtasks: string[] = [];
  
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

    completedItems: [{
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
      new Date().getTime()
      if(data){
        let incompleteTasks = data.filter((task: any) => task && task.task_status !== 'Complete')
        let completedTasks = data.filter((task: any) => task && task.task_status === 'Complete')

          this.taskItems = incompleteTasks
          this.completedItems = completedTasks
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
      if(this.newTask.task_status === 'Complete'){
        if(this.completedItems){
          this.completedItems.push(this.newTask)
        } else {
          this.completedItems = [this.newTask]
        }
      } else {
        if(this.taskItems){
          this.taskItems.push(this.newTask)
        } else {
          this.taskItems = [this.newTask]
        }
      }
      this.resetNewTask()
    }
    if(this.taskItems){
      if(this.completedItems){
        this.socketService.setNewTasks(this.id, [...this.taskItems, ...this.completedItems])
      } else {
        this.socketService.setNewTasks(this.id, this.taskItems)
      }
    }else{
      console.log('test')
      if(this.completedItems){
        this.socketService.setNewTasks(this.id, this.completedItems)
      }
    }
  }
  
  getStatusColor(status: string){
    switch(status){
      case 'Active':
        return 'hsl(100, 110%, 35%)'
      case 'In Progress':
        return 'hsl(35, 110%, 35%)'
      case 'Awaiting Review':
        return 'hsl(45, 110%, 35%)'
      case 'None':
        return 'hsl(220, 25%, 15%)'
      case 'Complete':
        return 'hsl(220, 25%, 15%)'
      default:
        return 'hsl(0, 100%, 60%)'
    }
  }

  getNewTaskActivated(){
    if(this.newTask.task_description !== ''){
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
    if(task.subtasks){
      task.subtasks.push({
        subtask_id: '',
        subtask_description: '',
        subtask_priority: 1,
        subtask_status: 'None',
      })
    }else{
      task.subtasks = [{
        subtask_id: Math.random().toString(36).slice(2, 9),
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
    this.itemRemovedIndex = this.taskItems?.findIndex((task: any) => task.task_id === id)
    const newTaskItems: any = this.taskItems?.filter((task: any) => task.task_id !== id)
    const newCompletedItems: any = this.completedItems?.filter((task: any) => task.task_id !== id)
    this.taskItems = newTaskItems
    this.completedItems = newCompletedItems
    this.setNewTasks()
  }

  deleteSubTask(task_id: any, id: string){
    const newSubtasks: any = this.taskItems?.find((task: any) => task.task_id === task_id)?.subtasks?.filter((subtask: any) => subtask.subtask_id !== id)
    const newTaskItems: any = this.taskItems?.map((task: any) => {
      if(task.task_id === task_id){
        task.subtasks = newSubtasks
      }
      return task
    })
    this.taskItems = newTaskItems
  }

  getStarColor(index: number, priority: number){
    return priority >= index ? '-webkit-text-fill-color:yellow' : '-webkit-text-fill-color:rgba(0,0,0,0.2)'
  }

  getSideColor(str: string){
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let hue = Math.abs(hash % 360);
    return `hsl(${hue}, 100%, 50%)`;
  }

  getItemInstance(index: number, item: any){
    return item.task_id
  }
}
