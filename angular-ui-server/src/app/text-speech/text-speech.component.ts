import { Component, OnInit } from '@angular/core';
import Speech from 'speak-tts';

@Component({
  selector: 'app-text-speech',
  templateUrl: './text-speech.component.html',
  styleUrls: ['./text-speech.component.scss']
})
export class TextSpeechComponent implements OnInit {

  speech = new Speech();
  textSpeech = '';
  constructor() {
    this.speech.init();
  }

  ngOnInit() {
  }
  speak() {
    this.speech.speak({ text: this.textSpeech });
  }
  textAreaChange(event) {
    this.textSpeech = event.target.value;
  }

}
