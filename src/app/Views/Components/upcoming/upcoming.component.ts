import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { IUpcoming } from '../../../Core/Interfaces/iupcoming';

@Component({
  selector: 'app-upcoming',
  imports: [],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})
export class UpcomingComponent implements OnInit {

  upcomingMovies: IUpcoming[];
  constructor(private _CategoryService: CategoryService){
    this.upcomingMovies = []
  }
  ngOnInit(): void {
    this._CategoryService.getUpcomingMovis().subscribe({
      next: (res) => {
        this.upcomingMovies =  res;
        console.log(res)
      },
      error: (err) =>{

        console.log(err)
      }
    })
  }

}
