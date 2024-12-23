import { Component } from '@angular/core';
import { YogaService } from '../services/yoga.service';
import { Yoga } from '../models/yoga';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  details:Yoga[]=[];
  fg!:FormGroup;
  fr:Yoga | null = null;
  constructor(private fb : FormBuilder,private service:YogaService){}
  ngOnInit():void{
    this.loadDetails();
    this.validations();
  }
    loadDetails():void{
      this.service.getAll().subscribe(data=>this.details=data);
    }
    validations():void{
      this.fg=this.fb.group({
        id:[null],
        name:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
        password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
        email :['',[Validators.required,Validators.email]]
      })
    }
    delete(id:number | undefined):void{
      if(id!==undefined){
        this.service.delete(id).subscribe(()=>{
          this.loadDetails();
        })
      }
    }
    searchbyemail(email:string):void{
      this.service.getByEmail(email).subscribe((Foundrecords)=>{
        if(Foundrecords && Foundrecords.length > 0){
          this.fr=Foundrecords[0];
        }
        else{
          this.fr=null;
          console.log(`Email is not found ${email}`);
        }
      })
    }
    add():void{
      const newrecord : Yoga={
        ...this.fg.value
      }
      this.service.add(newrecord).subscribe(()=>{
        this.loadDetails();
        this.resetform();
      })
    }
    add1(newrecord : Yoga):void{
      this.service.add(newrecord).subscribe(()=>{
        this.loadDetails();
      })
    }
    resetform():void{
      this.fg.reset();
    }
    updaterecord():void{
      const id = this.fg.value.id;
      const update:Yoga ={
        ...this.fg.value
      };
      this.service.update(id,update).subscribe(()=>{
        this.loadDetails();
        this.resetform();

      })
    }
    updaterecord1(id:number,ur:Yoga):void{
        this.service.update(id,ur).subscribe(()=>{
          this.loadDetails();
      })
    }
}
