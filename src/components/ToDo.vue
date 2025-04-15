<template>
  <div class="todo">
    <div class="card text-left">
      <div class="card-header">
        ToDo Component
      </div>
      <div class="card-body">
        <h5 class="card-title">My tasks</h5>
        <div class="card-text">
          <form>
            <div class="form-group">
              <label for="task-title">Task title</label>
              <input
                v-model="model.title"
                type="text"
                class="form-control"
                id="task-title"
                placeholder="Enter task title"
              />
            </div>
            <div class="form-group">
              <label for="task-desc">Task description</label>
              <textarea
                v-model="model.description"
                class="form-control"
                id="task-desc"
                placeholder="Enter task description"
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="submit"
              :disabled="!isValid"
            >
              Submit
            </button>
          </form>

          <div v-if="loading" class="pt-3">Loading...</div>
          <ul v-else class="pt-3">
            <li
              v-for="item in filteredTaskList"
              :key="item.id"
              class="d-flex justify-content-between mb-3"
            >
              <div>
                <h4 v-if="item.status === 'completed'">
                  <s>{{ item.title }}</s>
                </h4>
                <h4 v-else>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
              </div>
              <button
                class="btn btn-primary"
                @click="markAsCompleted(item)"
                :disabled="item.status === 'completed'"
              >
                Complete
              </button>
            </li>
          </ul>
        </div>
        <div class="card-footer">
          <button
            class="btn"
            :class="{ 'btn-primary': !filterStatus }"
            @click="filterStatus = ''"
          >
            All
          </button>
          <button
            class="btn"
            :class="{ 'btn-primary': filterStatus === 'completed' }"
            @click="filterStatus = 'completed'"
          >
            Completed
          </button>
          <button
            class="btn"
            :class="{ 'btn-primary': filterStatus === 'incompleted' }"
            @click="filterStatus = 'incompleted'"
          >
            InCompleted
          </button>
          <p class="mt-3">Active tasks count: {{ activeTasksCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task } from '@/models/task';
import { LocalStorageTodoRepository } from '@/repositories/LocalStorageTodoRepository';

const repo = new LocalStorageTodoRepository();

export default defineComponent({
  name: 'ToDo',
  data() {
    return {
      model: new Task(),
      taskList: [] as Task[],
      filterStatus: '',
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    try {
      this.taskList = await repo.getAll();
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async submit() {
      try {
        await repo.create(this.model);
        this.taskList = await repo.getAll();
        this.model = new Task();
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
    async markAsCompleted(task: Task) {
      try {
        task.status = 'completed';
        await repo.update(task);
        this.taskList = await repo.getAll();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
  },
  computed: {
    isValid(): boolean {
      return (
        this.model.title.trim() !== '' && this.model.description.trim() !== ''
      );
    },
    filteredTaskList(): Task[] {
      return this.filterStatus
        ? this.taskList.filter((item) => item.status === this.filterStatus)
        : this.taskList;
    },
    activeTasksCount(): number {
      return this.taskList.filter((item) => item.status !== 'completed').length;
    },
  },
});
</script>

<style scoped>
.todo {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 8px;
}

.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card-footer button {
  margin-right: 10px;
}

.card-footer p {
  margin-top: 10px;
  font-weight: bold;
}
</style>