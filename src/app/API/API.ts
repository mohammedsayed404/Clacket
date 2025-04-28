import { HttpHeaders } from "@angular/common/http";

export const API  = {

  AuthUrl: 'https://localhost:5001/api/account',
  TMDBUrl: 'https://api.themoviedb.org/3',
  APIKey: 'bb719a0995d909ccf6b0f20d425c9698',
  TMDB_Account_Id: '21970239',
  TMDB_Header_Token: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjcxOWEwOTk1ZDkwOWNjZjZiMGYyMGQ0MjVjOTY5OCIsIm5iZiI6MTc0NTUzNTEzMi4wMTksInN1YiI6IjY4MGFjMDljMjcxZWNiM2FlMDhhMzY2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fjX0eBDTWrBrPjTWV-_M-LPFx8ZL7e9DQqysBI8sbVQ'
})

}
