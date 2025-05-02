import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { ITopRated } from '../../../Core/Interfaces/itop-rated';

@Component({
  selector: 'app-top-rated',
  imports: [],
  templateUrl: './top-rated.component.html',
  styleUrl: './top-rated.component.css'
})
export class TopRatedComponent implements OnInit {

  topRated: ITopRated[];
  constructor(private _CategoryService: CategoryService){
    this.topRated = []
  }
  ngOnInit(): void {
    this._CategoryService.getTopRatedMovis().subscribe({
      next: (res) => {
        this.topRated =  res;
        console.log(res)
      },
      error: (err) =>{

        console.log(err)
      }
    })
  }

  
}
