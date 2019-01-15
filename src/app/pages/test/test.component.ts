import {Component, OnInit} from '@angular/core';
@Component({
  templateUrl: './test.html',
  styleUrls: ['./test.scss']
})
export class TestComponent  implements  OnInit {

  sizeTheVideo(){
    // - 1.78 is the aspect ratio of the video
// - This will work if your video is 1920 x 1080
// - To find this value divide the video's native width by the height eg 1920/1080 = 1.78
    var aspectRatio = 1.78;

    var video = document.getElementById('videoWithJs') as HTMLElement;
    console.log(video.offsetHeight);
    var videoHeight = video.offsetHeight;
    var newWidth = videoHeight*aspectRatio;
    var halfNewWidth = newWidth/2;
    video.style.width = newWidth + 'px';
    video.style.left = '50%';
    video.style.marginLeft = "-"+halfNewWidth+"px"
    // var videoHeight = video.offsetHeight();
    // var newWidth = videoHeight*aspectRatio;
    // var halfNewWidth = newWidth/2;

    //Define the new width and centrally align the iframe
    // video.css({"width":newWidth+"px","left":"50%","margin-left":"-"+halfNewWidth+"px"});
  }

  ngOnInit(): void {
    this.sizeTheVideo();
  }
}
