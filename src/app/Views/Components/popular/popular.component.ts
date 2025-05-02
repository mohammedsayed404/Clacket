import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Core/Services/category.service';
import { IPopular } from '../../../Core/Interfaces/ipopular';

@Component({
  selector: 'app-popular',
  imports: [],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent implements  OnInit{

  popularMovies: IPopular[];
  constructor(private _CategoryService:CategoryService){
    this.popularMovies = []
  }
  ngOnInit(): void {
    this._CategoryService.getPopularMovis().subscribe({
      next: (res) => {
        this.popularMovies =  res;
        console.log(res)
      },
      error: (err) =>  {
        
        console.log(err)
      }
    })
  }


}
