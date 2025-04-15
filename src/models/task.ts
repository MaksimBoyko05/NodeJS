export class Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'incompleted';

  constructor() {
    this.id = Date.now().toString();
    this.title = '';
    this.description = '';
    this.status = 'incompleted';
  }
}
