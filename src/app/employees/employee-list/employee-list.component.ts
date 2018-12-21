import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service:EmployeeService,
    private firestore:AngularFirestore,
    private toastr:ToastrService) { }
  list:Employee[];
  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray=>{
      this.list=actionArray.map(item=>{
        return {
          id:item.payload.doc.id, 
        ...item.payload.doc.data()} as Employee;
      })
  });
  }

  onEdit(emp:Employee){
    this.service.formData=Object.assign({},emp);
  }
  ondelete(id:string){
    if(confirm("are you sure to delete this record.")){
      this.firestore.doc('employees/'+id).delete();
      this.toastr.success('delete successfully','EMP. Register')
    }
  }

}
