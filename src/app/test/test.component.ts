import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

interface TestQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})

export class TestComponent implements OnInit, OnDestroy {
  started = false;
  currentIndex = 0;
  correctCount = 0;
  passingScore = 3;
  userAnswers: number[] = [];

  readonly initialTime = 600;
  timer = this.initialTime;
  displayTimer = '10:00';
  private timerInterval!: any;
  timeTakenDisplay = '';

  questions: TestQuestion[] = [
    {
      question: 'Що слід зробити насамперед під час оголошення повітряної тривоги?',
      options: [
        'Включити телевізор',
        'Перейти до укриття',
        'Зателефонувати родичам',
        'Залишитися в кімнаті'
      ],
      correctAnswerIndex: 1
    },
    {
      question: 'У якому приміщенні квартири найменше ризику під час обстрілу?',
      options: [
        'На балконі',
        'У коридорі',
        'У ванній кімнаті',
        'У кухні'
      ],
      correctAnswerIndex: 2
    },
    {
      question: 'Скільки літрів води слід мати на одну людину на день у тривожному рюкзаку?',
      options: [
        '1 літр',
        '2 літри',
        '3 літри',
        '5 літрів'
      ],
      correctAnswerIndex: 2
    },
    {
      question: 'Який засіб найефективніший для знезараження води в польових умовах?',
      options: [
        'Кип’ятіння',
        'Додавання солі',
        'Фільтрація через тканину',
        'Використання харчової соди'
      ],
      correctAnswerIndex: 0
    },
    {
      question: 'Який із цих предметів НЕ є обов’язковим у тривожному рюкзаку?',
      options: [
        'Ніж-мультитул',
        'Документи в пластиковому чохлі',
        'Мобільний телефон із павербанком',
        'Надувний матрац'
      ],
      correctAnswerIndex: 3
    }
  ];


  ngOnInit() {
    window.onbeforeunload = () => true;
    this.userAnswers = Array(this.questions.length).fill(-1);
  }
  ngOnDestroy() {
    window.onbeforeunload = null;
  }

  startTest(): void {
    this.started = true;
    this.currentIndex = 0;
    this.correctCount = 0;
    this.timer = this.initialTime;
    this.updateDisplayTimer();
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      this.timer--;
      this.updateDisplayTimer();

      if (this.timer <= 0) {
        this.finishTest();
      }
    }, 1000);
  }

  private updateDisplayTimer() {
    const m = Math.floor(this.timer / 60);
    const s = this.timer % 60;
    this.displayTimer =
      `${m}`.padStart(2, '0') + ':' + `${s}`.padStart(2, '0');
  }

  private finishTest() {
    this.clearTimer();
    const taken = this.initialTime - this.timer;
    const m = Math.floor(taken / 60);
    const s = taken % 60;
    this.timeTakenDisplay =
      `${m}`.padStart(2, '0') + ':' + `${s}`.padStart(2, '0');

    this.currentIndex = this.questions.length;
  }

  private clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
  }

  retakeTest(): void {
    this.clearTimer();
    this.timer = this.initialTime;
    this.updateDisplayTimer();
    this.started = false;
    this.currentIndex = 0;
    this.correctCount = 0;
    this.userAnswers = Array(this.questions.length).fill(-1);
  }


  goToNext(): void {
    const sel = this.userAnswers[this.currentIndex];
    if (sel === this.questions[this.currentIndex].correctAnswerIndex) {
      this.correctCount++;
    }

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.finishTest();
    }
  }
}
