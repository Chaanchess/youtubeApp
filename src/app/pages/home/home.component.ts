import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from '../../models/youtube.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  constructor(private youtubeService: YoutubeService) {}

  ngOnInit() {
    this.cargarVideos();
  }

  cargarVideos() {
    this.youtubeService.getVideos().subscribe(
      (res) => {
        this.videos.push(...res);
        console.log(this.videos);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ya no hay mas vídeos para cargar...',
        })
      }
    );
  }

  mostrarVideo(video: Video) {
    Swal.fire({
      html: `
      <h4>${video.title}</h4>
      <iframe width="100%" 
      height="315" 
      src="https://www.youtube.com/embed/${video.resourceId.videoId}" 
      frameborder="0" 
      allow="accelerometer; 
      autoplay; clipboard-write; 
      encrypted-media; gyroscope; 
      picture-in-picture" 
      allowfullscreen>
      </iframe>
      `,
    });
  }
}
