import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyCtwCGWAwHboIZU66Cq7o_KptyZ5-2jBCc';
  private playList = 'UUZMruMSqlWs20W-kkuVMlTg';
  private nextToken = '';

  constructor(private http: HttpClient) {}

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '16')
      .set('playlistId', this.playList)
      .set('key', this.apikey)
      .set('pageToken', this.nextToken);

    return this.http
      .get<YoutubeResponse>(url, { params })
      .pipe(map((resp) => {
        this.nextToken = resp.nextPageToken;
        return resp.items;
      }),
      map(items =>{
        return items.map( video => video.snippet );
      }));
  }
}
