import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SidebarComponent
  ],
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  form!: FormGroup;

  categories: string[] = [
    '🔥 Основи виживання',
    '🩺 Перша медична допомога',
    '🧠 Психологічна стійкість',
    '🚨 Техніка безпеки та евакуація',
    '🛡️ Кібербезпека під час війни',
    '📞 Комунікація та взаємодія в НС'
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      category: ['', Validators.required],
      modules: this.fb.array([this.createModuleGroup()]),
      blocks: this.fb.array([this.createBlockGroup()]),
      articles: this.fb.array([this.createArticleGroup()]),
      tests: this.fb.array([this.createTestGroup()])
    });
  }

  // ------------------ МОДУЛІ ------------------

  get modules(): FormArray {
    return this.form.get('modules') as FormArray;
  }

  private createModuleGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      shortDesc: [''],
      longDesc: ['']
    });
  }

  addModule(): void {
    this.modules.push(this.createModuleGroup());
  }

  removeModule(index: number): void {
    this.modules.removeAt(index);
  }

  saveModule(index: number): void {
    const mod = this.modules.at(index).value;
    console.log(`Зберігаємо модуль #${index + 1}:`, mod);
    // TODO: Виклик API
  }

  // ------------------ СТАТТІ ТА БЛОКИ ------------------

  get blocks(): FormArray {
    return this.form.get('blocks') as FormArray;
  }

  private createBlockGroup(): FormGroup {
    return this.fb.group({
      header: ['', Validators.required],
      content: ['']
    });
  }

  get articles(): FormArray {
    return this.form.get('articles') as FormArray;
  }

  private createArticleGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      timeToRead: [''],
      toModule: [''],
      blocks: this.fb.array([
        this.fb.group({
          header: ['', Validators.required],
          content: ['']
        })
      ])
    });
  }

  addArticle(): void {
    this.articles.push(this.createArticleGroup());
  }

  removeArticle(idx: number): void {
    this.articles.removeAt(idx);
  }

  addBlock(articleIndex: number): void {
    const blocks = this.articles.at(articleIndex).get('blocks') as FormArray;
    blocks.push(this.fb.group({
      header: ['', Validators.required],
      content: ['']
    }));
  }

  removeBlock(articleIndex: number, blockIndex: number): void {
    const blocks = this.getBlocks(articleIndex);
    blocks.removeAt(blockIndex);
  }

  getBlocks(i: number): FormArray {
    return this.articles.at(i).get('blocks') as FormArray;
  }

  // ------------------ ТЕСТИ, ЗАПИТАННЯ, ВІДПОВІДІ ------------------

  get tests(): FormArray {
    return this.form.get('tests') as FormArray;
  }

  private createTestGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      module: [''],
      questions: this.fb.array([
        this.createQuestionGroup()
      ])
    });
  }

  private createQuestionGroup(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required],
      answers: this.fb.array([
        this.createAnswerGroup(),
        this.createAnswerGroup(),
        this.createAnswerGroup(),
        this.createAnswerGroup()
      ])
    });
  }

  private createAnswerGroup(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false]     // <-- додано булевий контрол для правильності
    });
  }

  addTest(): void {
    this.tests.push(this.createTestGroup());
  }

  removeTest(index: number): void {
    this.tests.removeAt(index);
  }

  getQuestions(testIndex: number): FormArray {
    return this.tests.at(testIndex).get('questions') as FormArray;
  }

  addQuestion(testIndex: number): void {
    this.getQuestions(testIndex).push(this.createQuestionGroup());
  }

  removeQuestion(testIndex: number, questionIndex: number): void {
    this.getQuestions(testIndex).removeAt(questionIndex);
  }

  getAnswers(testIndex: number, questionIndex: number): FormArray {
    return this.getQuestions(testIndex).at(questionIndex).get('answers') as FormArray;
  }

  addAnswer(testIndex: number, questionIndex: number): void {
    this.getAnswers(testIndex, questionIndex).push(this.createAnswerGroup());
  }

  removeAnswer(testIndex: number, questionIndex: number, answerIndex: number): void {
    this.getAnswers(testIndex, questionIndex).removeAt(answerIndex);
  }

  /** Метод для вибору «правильної» відповіді */
  selectCorrect(testIdx: number, qIdx: number, aIdx: number): void {
    const answers = this.getAnswers(testIdx, qIdx).controls;
    answers.forEach((ctrl, idx) => {
      ctrl.get('isCorrect')!.setValue(idx === aIdx);
    });
  }

  // ------------------ ACNHOR LINKS ------------------
  @ViewChild('courseSection') courseSection!: ElementRef<HTMLElement>;
  @ViewChild('moduleSection') moduleSection!: ElementRef<HTMLElement>;
  @ViewChild('articleSection') articleSection!: ElementRef<HTMLElement>;
  @ViewChild('testSection') testSection!: ElementRef<HTMLElement>;

  scrollToCourse(): void {
    this.courseSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToModule(): void {
    this.moduleSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToArticle(): void {
    this.articleSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToTest(): void {
    this.testSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 1700;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // ------------------ DEBUG ------------------
  get f() {
    return this.form.controls;
  }
}
