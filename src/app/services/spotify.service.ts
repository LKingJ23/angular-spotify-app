import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${ query }`;
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer QCWkrg8VErtySinxDAa7e66_dwg0QAmHyMDlyWG9rjDQhEjFiRW5mR2a-pICjJ3TwPdeN1v7Qyp5Nc0mrU'
    });

    return this.http.get(url, {headers});
  }

  getNewReleases(){

    return this.getQuery('browse/new-releases')
                .pipe(map(data => data['albums'].items));
  }

  getArtistas(termino: string){

    return this.getQuery(`search?q=${ termino }&type=artist`)
                .pipe(map( data => data['artists'].items));
  }

  getArtista(id: string){

    return this.getQuery(`artists/${id}`);
                //.pipe(map( data => data['artists'].items));
  }

  getTopTracks(id: string){

    return this.getQuery(`artists/${id}/top-tracks?country=es`)
                .pipe(map( data => data['tracks']));
  }
}
